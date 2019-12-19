import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BddStorage} from '../../providers/utils/bdd-storage';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  bddLocal:BddStorage = new BddStorage();
  listScheduleMedToday:any = [];
  listScheduleExamsToday: any = [];
  listScheduleQueryToday:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService){
    // this.getLastMed();
    // this.getLastExam();
    // this.getLastQuery();
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }
  ionViewDidEnter(){
    this.getLastMed();
    this.getLastExam();
    this.getLastQuery();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }
  addShortcut(page: string){
    this.navCtrl.push(page);
  }
  openPage(page: string){
    this.navCtrl.push(page,null,{animation: 'wp-transition'});
  }
  openPageButton(page: string, event){
    if(event.target.tagName != 'BUTTON' &&  event.target.tagName != 'SPAN'){
      this.openPage(page);
    };
  }
  openAddMed(){
    //this.navCtrl.push('AddMedPage',this.navCtrl.g)
  }
  getLastMed(){
    let dateToday:Date = new Date();
    let listScheduleMed:any;
    this.bddLocal.get('medications',(res)=>{
      listScheduleMed = res;
      if(listScheduleMed.length > 0){
        for(let item of listScheduleMed){
          let timers:any=[];
          for(let time of item.alarms){
            if(dateToday.getHours()<=time.trigger.every.hour){
              timers.push(time.trigger.every);
            }
          }
          if(timers.length!=0){
            item.timers = timers;
            this.listScheduleMedToday.push(item);
          }
        }
      }else{
        this.listScheduleMedToday = res;
      }
    });

  }
  getLastExam(){

    this.bddLocal.get('exams',(res)=>{
      let listScheduleExams = res;
      if(listScheduleExams.length > 0){
        let dateToday:Date = new Date();
        console.log(res);
        for(let item of listScheduleExams){
          let date:Date = new Date(item.exam_date);
          if(dateToday.getMonth()<=date.getMonth() && dateToday.getDate()<=date.getDate() &&
          dateToday.getFullYear()<=date.getFullYear()){
            item.dateHour = (new Date(item.exam_date).toLocaleString()).split(" ")[1];
            item.dateHour = item.dateHour.split(":")[0]+":"+item.dateHour.split(":")[1];
            item.date = (new Date(item.exam_date).toLocaleString()).split(" ")[0];
            this.listScheduleExamsToday.push(item);

          }
        }
      }else{
       this.listScheduleExamsToday = res;
      }

    });

  }
  getLastQuery(){
    this.bddLocal.get('appointment',(res)=>{
      let listScheduleQuery = res;
      if(listScheduleQuery.length > 0){
        let dateToday:Date = new Date();
        for(let item of listScheduleQuery){
          let date:Date = new Date(item.date_appointment);
          if(dateToday.getMonth()<=date.getMonth() && dateToday.getDate()<=date.getDate() &&
          dateToday.getFullYear()<=date.getFullYear()){
            item.dateHour = (new Date(item.date_appointment).toLocaleString()).split(" ")[1];
            item.dateHour = item.dateHour.split(":")[0]+":"+item.dateHour.split(":")[1];
            item.date = (new Date(item.date_appointment).toLocaleString()).split(" ")[0];
            this.listScheduleQueryToday.push(item);
          }
        }
      }else{
        this.listScheduleQueryToday = res;
      }
    });

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
