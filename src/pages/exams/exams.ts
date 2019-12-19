import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExamService } from './exam-service';
import {BddStorage} from '../../providers/utils/bdd-storage';
declare var document;

@IonicPage()
@Component({
  selector: 'page-exams',
  templateUrl: 'exams.html',
})
export class ExamsPage {
  exams: any[] = [];
  bddLocal:BddStorage = new BddStorage();
  placeholderFlag: boolean = true;
  fade: any;
  scrollContentHeight: number;
  listHeight:  number;
  actualScroll: number = 0;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public examService: ExamService, public storage: Storage, private localNotifications: LocalNotifications, private translate: TranslateService) {
    // this.storage.get('usr').then((usr)=>{
    //   this.examService.getMedicalExam(usr,(result)=>{
    //     let examList = result.medical_exams;
    //     console.log(examList);
    //   })
    // })
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get('EXAMS').subscribe((res)=>{
      this.translation = res;
    });

  }
  ionViewWillEnter(){
    this.listDateExams();
  }
  ionViewDidEnter(){
    this.checkAlarms();

  }
  ionViewDidLoad(){
    this.fade = document.getElementsByClassName('fade').item(0);
    this.scrollContentHeight = document.getElementsByClassName('scroll-content').item(1).clientHeight;
  }
  listDateExams(){
    this.exams = [];
     this.bddLocal.get("exams",(res)=>{
      let exams = res;
      for(let item of exams){
        item.dateHour = new Date(item.exam_date).toLocaleString();
        this.exams.push(item);
      }
      if(exams.length > 0){
        this.placeholderFlag = false;
      }else{
        this.placeholderFlag = true;
      }
    });

  }
  openAddExam(){
    this.navCtrl.push('AddExamPage');
  }
  deleteExams(exam){
    this.examService.deleteExam(exam.id,(result,err?)=>{
      if(result){
        this.examService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");
        this.bddLocal.removeItemById("exams",exam.id,()=>{
          this.listDateExams();
        });

      }else{
        this.examService.sendAlert(this.translation.TOAST_MESSAGE_ERROR,"error");
        if(err.status == 401){
          this.navCtrl.setRoot("LoginPage");
        }else{
          this.navCtrl.push('InternetErrorPage');
        }

      };
    });
  }
  enableNotification(alarmes,id,idAlarm){
    let btnIcon:any = document.querySelectorAll("#"+id)[0];
    this.bddLocal.getItemById("exams",idAlarm,(res)=>{
      let alarm:any = res;
      if(this.hasClass(btnIcon,"icon-disabled")){
        btnIcon.classList.remove("icon-disabled");
        alarm.notification = true;
        this.localNotifications.schedule(alarmes);
        this.examService.sendAlert(this.translation.ALARM.ACTIVE,"success");
        this.bddLocal.setItemById('exams',idAlarm,alarm);

      }else{
        btnIcon.classList.add("icon-disabled");
        let ids:any = [];
        for(let item of alarmes){
          ids.push(item.id);
        }
        alarm.notification = false;
       this.localNotifications.cancel(ids).then(() => {
          this.examService.sendAlert(this.translation.ALARM.DISABLED,"success");
        });
        this.bddLocal.setItemById('exams',idAlarm,alarm);
      }
    });

  }
  hasClass(element, className) {
      return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
  }
  scroll(position: any){
    this.actualScroll = position.scrollTop;
    //console.log((teste.scrollTop + window.innerHeight -70) +' '+ this.listHeight);
    if(position.scrollTop + window.innerHeight - 70 >= document.getElementById('list').clientHeight){
      this.fade.setAttribute('display','false');
    }
    else{
      this.fade.setAttribute('display','true');
    }
  }
  checkFade(){
    //this.listHeight = document.getElementById('list').clientHeight;
    //console.log(this.listHeight);
    setTimeout(() => {
      if(this.actualScroll + window.innerHeight - 70 >= document.getElementById('list').clientHeight){
        this.fade.setAttribute('display','false');
      }
      else{
        this.fade.setAttribute('display','true');
      }
    }, 10);

  }
  checkAlarms(){
    for(let i = 0; i < this.exams.length; i++){
      if(this.exams[i].notification == false){
        document.getElementById('btnAlarm'+i).classList.add('icon-disabled');
      }
    };
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
