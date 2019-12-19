import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { AddExamService } from './add-exam.service';
import {BddStorage} from '../../providers/utils/bdd-storage';
import {TranslateService} from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-add-exam',
  templateUrl: 'add-exam.html',
})
export class AddExamPage {
  selectedExam: string = "exame de imagem";
  examModified: boolean = false;
  selectedAlarmInterval: string;
  alarmToggle: boolean = false;
  examForm:FormGroup;
  bddLocal:BddStorage = new BddStorage();
  translation: any;
  selectInterval:any = {title: 'Você deseja ser avisado?', cssClass: 'select-alarm'};
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private loadingCtrl: LoadingController,
  private formBuilder: FormBuilder, public addExamService:AddExamService, public translate: TranslateService, private localNotifications: LocalNotifications, private alertCtrl: AlertController) {
    this.translate.get("ADD_EXAM").subscribe((res)=>{
      this.translation = res;
    })
    this.examForm = this.formBuilder.group({
        exam_type: ['', [Validators.required]],
        specific_exam: ['', [Validators.required]],
        local_exam: ['', [Validators.required]],
        exam_date: ['', [Validators.required]],
        exam_hour: ['', [Validators.required]],
        interval: ['2hra', [Validators.required]],
        notification: 0,

    })
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExamPage');
  }
  saveExam(){
    let loading = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    })
    loading.present();
    if(this.examForm.valid){
      console.log(this.examForm.value);
      this.examForm.value.exam_date = this.examForm.value.exam_date+" "+this.examForm.value.exam_hour;
      if(this.examForm.value.interval !== "false"){
        var hraMin = this.createInterval();
      }else{
        this.examForm.value.notification = 0;
      }
      console.log(hraMin);
      this.addExamService.postExam(this.examForm.value,(result,err?)=>{
        if(result){
          let alarms:any = [];
          let date;
          if(this.examForm.value.interval == "24hra"){
            date = new Date(result.medical_exam.exam_date);
            let newDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate()-1);
            date = new Date(newDate);
          }else{
            date = new Date(result.medical_exam.exam_date);
          }
          if(hraMin){
            var hra = parseInt(hraMin.split(":")[0]);
            var min = parseInt(hraMin.split(":")[1]);
          }

          // if(hra==0){
          //   hra = 24;
          // }
          //console.log(date.getMonth());
          //console.log(date.getDate());
          // new Date("January 31 1980 12:30");
          // new Date("2019",0,13,23,9)
          let alarmMessageTime;
          switch (this.examForm.value.interval) {
            case "1hra":
              alarmMessageTime = "1 " + this.translation.ALARM.TITLE2;
              break;
            case "2hra":
              alarmMessageTime = "2 " + this.translation.ALARM.TITLE3;
              break;
            case "3hra":
              alarmMessageTime = "3 " + this.translation.ALARM.TITLE3;
              break;
            case "24hra":
              alarmMessageTime = "24 " + this.translation.ALARM.TITLE3;
              break;
            default:
              alarmMessageTime = "2 " + this.translation.ALARM.TITLE3;
              break;
          }
          let attr = {
            id: new Date().getTime(),
            title: this.translation.ALARM.TITLE + " " + alarmMessageTime,
            priority: 1,
            vibrate: false,
            sound: 'file://assets/audio/beep3.mp3',
            text: result.medical_exam.exam_type+", "+result.medical_exam.local_exam,
            trigger: { at: new Date(date.getFullYear(),date.getMonth(),date.getDate(),hra,min) }
            // trigger: { at: { month: date.getMonth()+1, day: date.getDate(), hour: hra, minute: min } }
          }
          console.log(attr);
          alarms.push(attr);
          this.localNotifications.schedule(alarms);
          result.medical_exam.alarms = alarms;
          this.bddLocal.addItem("exams",result.medical_exam,()=>{
            loading.dismiss();
            this.navCtrl.pop();
            this.addExamService.sendAlert(this.translation.TOAST_MESSAGE,"success");
          });

        }else{
          if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
          }else{
            this.navCtrl.push('InternetErrorPage');
          }
          loading.dismiss();
        };
      });
    }else{
      let message;
      if(!this.examForm.controls['exam_type'].valid){
        message = this.translation.ERROR.OPTION_1;
      }else if(!this.examForm.controls['specific_exam'].valid){
        message = this.translation.ERROR.OPTION_2;
      }else if(!this.examForm.controls['local_exam'].valid){
        message = this.translation.ERROR.OPTION_3;
      }else if(!this.examForm.controls['exam_date'].valid){
        message = this.translation.ERROR.OPTION_4;
      }else if(!this.examForm.controls['exam_hour'].valid){
        message = this.translation.ERROR.OPTION_5;
      }
      this.addExamService.sendAlert(message, "error");
      loading.dismiss();
    }

  }
  createInterval(){
    let hra = parseInt(this.examForm.value.exam_hour.split(":")[0]);
    let min = parseInt(this.examForm.value.exam_hour.split(":")[1]);
    if(this.examForm.value.interval=="1hra"){
      if(hra==0){
        hra = 23;
      }else{
        hra = hra - 1;
      }
    }else if(this.examForm.value.interval=="2hra"){
      if(hra==0){
        hra = 22;
      }else{
        hra = hra - 2;
      }
    }else if(this.examForm.value.interval=="3hra"){
      if(hra==0){
        hra = 21;
      }else{
        hra = hra - 3;
      }
    }
    let hraMin=hra+":"+min;
    return hraMin;
  }
  openExamSelect(){
    let examSelect = this.alertCtrl.create({
        title: this.translation.EXAM_SELECT.TITLE,
        cssClass: "alert-class",
        inputs: [
          {
            type: "radio",
            label: this.translation.EXAM_SELECT.BUTTON1,
            value: this.translation.EXAM_SELECT.BUTTON1,
          },
          {
            type: "radio",
            label: this.translation.EXAM_SELECT.BUTTON2,
            value: this.translation.EXAM_SELECT.BUTTON2,

          },
          {
            type: "radio",
            label: this.translation.EXAM_SELECT.BUTTON3,
            value: this.translation.EXAM_SELECT.BUTTON3
          }
        ],
        buttons: [
          {
            text: this.translation.EXAM_SELECT.BUTTONS.CANCEL,
            role: 'cancel',
            handler: data => {
              if(!this.examForm.controls['exam_type'].valid){
                let bottomBorderCorrection = <HTMLElement> document.getElementById('modal-input').firstElementChild;
                bottomBorderCorrection.focus();
                bottomBorderCorrection.blur();
              }
            }
          },
          {
            text: this.translation.EXAM_SELECT.BUTTONS.DONE,
            handler: data => {
              this.examForm.controls['exam_type'].setValue(data);
              let bottomBorderCorrection = <HTMLElement> document.getElementById('modal-input').firstElementChild;
              bottomBorderCorrection.focus();
              bottomBorderCorrection.blur();
            }
          }
        ]
    });
    examSelect.present();
    /*let examSelect = this.modalCtrl.create('ExamSelectPage',null,{enableBackdropDismiss: true,showBackdrop: true});
    examSelect.onDidDismiss(data =>{
      console.log(data);
      if(data != null){
        // this.selectedExam = data;
        this.examForm.controls['exam_type'].setValue(data);
        let bottomBorderCorrection = <HTMLElement> document.getElementById('modal-input').firstElementChild;
        bottomBorderCorrection.focus();
        bottomBorderCorrection.blur();
        // this.examModified = true;
      }
    });
    examSelect.present();*/
  }
  openAlarmIntervalSelect(event){
    if(event){
      this.alertCtrl.create({
        title: this.translation.ALARM_SELECT.TITLE,
        cssClass: "alert-class",
        inputs: [
          {
            type: "radio",
            label: this.translation.ALARM_SELECT.OPTION1,
            value: "1hra"
          },
          {
            type: "radio",
            label: this.translation.ALARM_SELECT.OPTION2,
            value: "2hra",
            checked: true
          },
          {
            type: "radio",
            label: this.translation.ALARM_SELECT.OPTION3,
            value: "3hra"
          },
          {
            type: "radio",
            label: this.translation.ALARM_SELECT.OPTION4,
            value: "24hra"
          }
        ],
        buttons: [
          {
            text: this.translation.ALARM_SELECT.BUTTONS.CANCEL,
            role: 'cancel',
            handler: data => {
              this.examForm.controls['notification'].setValue(false);
            }
          },
          {
            text: this.translation.ALARM_SELECT.BUTTONS.DONE,
            handler: data => {
              this.selectedAlarmInterval = data;
              this.examForm.controls['interval'].setValue(data);
            }
          }
        ]
      }).present();
    }

    /*let alarmIntervalSelect = this.modalCtrl.create('AlarmIntervalSelectPage',null,{enableBackdropDismiss: true,showBackdrop: true});
    alarmIntervalSelect.onDidDismiss(data =>{
      console.log(data);
      if(data != null){
        this.selectedAlarmInterval = data;
        }
      this.alarmToggle = false;
    });
    alarmIntervalSelect.present();*/
  }
  changeLanguage(lang){
    if(lang==1){
      this.translate.use('pt');
    }else if(lang==2){
      this.translate.use('en');
    }else if(lang==3){
      this.translate.use('es');
    }
  }

}
