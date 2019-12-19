import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BddStorage} from '../../providers/utils/bdd-storage';

/**
 * Generated class for the TodaySchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-today-schedule',
  templateUrl: 'today-schedule.html',
})
export class TodaySchedulePage {
  bddLocal:BddStorage = new BddStorage();
  listScheduleExams:any=[];
  listScheduleExamsToday:any=[];
  listScheduleMed:any=[];
  listScheduleMedToday:any=[];
  listScheduleQuery:any=[];
  listScheduleQueryToday:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    let dateToday:Date = new Date();
    this.bddLocal.get('exams',(res)=>{
      this.listScheduleExams = res;
      for(let item of this.listScheduleExams){
        let date:Date = new Date(item.exam_date);
        if(dateToday.getMonth()==date.getMonth() && dateToday.getDate()==date.getDate() &&
        dateToday.getFullYear()==date.getFullYear()){
          item.dateHour = (new Date(item.exam_date).toLocaleString()).split(" ")[1];
          item.dateHour = item.dateHour.split(":")[0]+":"+item.dateHour.split(":")[1];

          this.listScheduleExamsToday.push(item);
        }
      }
    });


    this.bddLocal.get('appointment',(res)=>{
      this.listScheduleQuery = res;
      for(let item of this.listScheduleQuery){
        let date:Date = new Date(item.date_appointment);
        if(dateToday.getMonth()==date.getMonth() && dateToday.getDate()==date.getDate() &&
        dateToday.getFullYear()==date.getFullYear()){
          item.dateHour = (new Date(item.date_appointment).toLocaleString()).split(" ")[1];
          item.dateHour = item.dateHour.split(":")[0]+":"+item.dateHour.split(":")[1];
          this.listScheduleQueryToday.push(item);
        }
      }
    });


    this.bddLocal.get('medications',(res)=>{
      this.listScheduleMed = res;
      console.log(this.listScheduleMed);
      for(let item of this.listScheduleMed){
        let timers:any=[];

        for(let time of item.alarms){

          // if(dateToday.getHours()<=time.trigger.every.hour dateToday.getMinutes()<=time.trigger.every.minute){
          if(dateToday.getHours()<=time.trigger.every.hour){
            timers.push(time.trigger.every);
          }
        }
        if(timers.length!=0){
          item.timers = timers;

          this.listScheduleMedToday.push(item);
        }
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodaySchedulePage');
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
