import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { AddQueryService } from './add-query.service';
import {BddStorage} from '../../providers/utils/bdd-storage';

@IonicPage()
@Component({
  selector: 'page-add-query',
  templateUrl: 'add-query.html',
})
export class AddQueryPage {
  selectedAlarmInterval: string;
  medical_appointment: FormGroup;
  type: string;
  bddLocal:BddStorage = new BddStorage();
  selectInterval:any = {title: 'Você deseja ser avisado?', cssClass: 'select-alarm'};
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private loadingCtrl:LoadingController,
    public formBuilder: FormBuilder, public viewCtrl: ViewController, public addQueryService:AddQueryService, private localNotifications: LocalNotifications, public translate: TranslateService, private alertCtrl: AlertController) {
    this.type = this.navParams.get('type');
    this.translate.get("ADD_QUERY").subscribe((res)=>{
      this.translation = res;
      this.selectInterval.title = this.translation.SELECT_INTERVAL
    });
    this.initMedicalAppointmentForm();
    if(this.navParams.get('data') != null){
      let data = this.navParams.get('data');
      this.medical_appointment.setValue({
        hour: data.hour,
        professional_name: data.obj.professional_name,
        medical_specialty: data.obj.medical_specialty,
        local_appointment: data.obj.local_appointment,
        //notification: data.obj.notification,
        date_appointment: data.date,
        state: data.obj.state,
        city: data.obj.city
      });
    }

  }

  initMedicalAppointmentForm(){
    this.medical_appointment = this.formBuilder.group({
      professional_name: ['',Validators.required],
      medical_specialty: ['',Validators.required],
      local_appointment: ['',Validators.required],
      notification: 0,
      state: ['CE'],
      city: ['Fortaleza'],
      date_appointment: ['',Validators.required],
      hour: ['',Validators.required],
      interval: ['2hra', [Validators.required]]
    });

  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  saveQuery(){
    let loading = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    })
    loading.present();
    if(this.medical_appointment.valid){
      this.medical_appointment.value.date_appointment = this.medical_appointment.value.date_appointment+" "+this.medical_appointment.value.hour;
      console.log(this.medical_appointment.value);
      // delete this.medical_appointment.value.hour;
      this.addQueryService.postMedicalAppointment(this.medical_appointment.value,(result,err?)=>{
          if(result){
            var hraMin = this.createInterval();
            let alarms:any = [];
            let date;
            if(this.medical_appointment.value.interval == "24hra"){
              date = new Date(result.medical_appointment.date_appointment);
              let newDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate()-1);
              date = new Date(newDate);
            }else{
              date = new Date(result.medical_appointment.date_appointment);
            }
            let hra = parseInt(hraMin.split(":")[0]);
            let min = parseInt(hraMin.split(":")[1]);


            let alarmMessageTime;
            switch (this.medical_appointment.value.interval) {
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
              text: result.medical_appointment.professional_name+" - "+result.medical_appointment.medical_specialty+", "+result.medical_appointment.local_appointment,
              trigger: { at: new Date(date.getFullYear(),date.getMonth(),date.getDate(),hra,min) }
            }
            alarms.push(attr);
            console.log(attr);
            this.localNotifications.schedule(alarms);
            result.medical_appointment.alarms = alarms;
            this.bddLocal.addItem("appointment",result.medical_appointment,()=>{
              loading.dismiss();
              this.navCtrl.pop();
              this.addQueryService.sendAlert(this.translation.TOAST_MESSAGE,"success");
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
      if(!this.medical_appointment.controls['professional_name'].valid){
        message = this.translation.ERROR.OPTION_1;
      }else if(!this.medical_appointment.controls['medical_specialty'].valid){
        message = this.translation.ERROR.OPTION_2;
      }else if(!this.medical_appointment.controls['local_appointment'].valid){
        message = this.translation.ERROR.OPTION_3;
      }else if(!this.medical_appointment.controls['date_appointment'].valid){
        message = this.translation.ERROR.OPTION_4;
      }else if(!this.medical_appointment.controls['hour'].valid){
        message = this.translation.ERROR.OPTION_5;
      }
      loading.dismiss();
      this.addQueryService.sendAlert(message, "error");
    }

  }
  createInterval(){
    let hra = parseInt(this.medical_appointment.value.hour.split(":")[0]);
    let min = parseInt(this.medical_appointment.value.hour.split(":")[1]);
    if(this.medical_appointment.value.interval=="1hra"){
      if(hra==0){
        hra = 23;
      }else{
        hra = hra - 1;
      }
    }else if(this.medical_appointment.value.interval=="2hra"){
      if(hra==0){
        hra = 22;
      }else{
        hra = hra - 2;
      }
    }else if(this.medical_appointment.value.interval=="3hra"){
      if(hra==0){
        hra = 21;
      }else{
        hra = hra - 3;
      }
    }
    let hraMin=hra+":"+min;
    return hraMin;
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
              this.medical_appointment.controls['notification'].setValue(false);
            }
          },
          {
            text: this.translation.ALARM_SELECT.BUTTONS.DONE,
            handler: data => {
              this.selectedAlarmInterval = data;
              this.medical_appointment.controls["interval"].setValue(data);
            }
          }
        ]
      }).present();
    }
    /*let alarmIntervalSelect = this.modalCtrl.create('AlarmIntervalSelectPage',null,{showBackdrop:true, enableBackdropDismiss:true});
    alarmIntervalSelect.onDidDismiss(data =>{
      console.log(data);
      if(data != null){
        this.selectedAlarmInterval = data;
        }
      this.medical_appointment.value.notification = false;
    });
    alarmIntervalSelect.present();*/
  }
}
