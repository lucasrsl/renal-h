import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HowAreYouTodayService } from './how-are-you-today-service';
import {BddStorage} from '../../providers/utils/bdd-storage';

@IonicPage()
@Component({
  selector: 'page-how-are-you-today',
  templateUrl: 'how-are-you-today.html',
})
export class HowAreYouTodayPage {
  dailyVolume: number;
  cupNumber: number;
  bddLocal:BddStorage = new BddStorage();
  listScheduleExams:any=[];
  listScheduleExamsToday:any=[];
  listScheduleMed:any=[];
  listScheduleMedToday:any=[];
  listScheduleQuery:any=[];
  listScheduleQueryToday:any=[];
  dailyVolumeMax: number;
  dailyVolumeProgress: number = 0;
  textStatus: string = "Você ainda pode beber hoje";
  textLiquid: string;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public howAreYouTodayService: HowAreYouTodayService, public storage: Storage,public loadingCtrl: LoadingController, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("HOW_ARE_YOU_TODAY").subscribe((res)=>{
      this.translation = res;
      this.textStatus = res.STATUS.TEXT1
    });

  }
  ionViewWillEnter(){
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    this.storage.get('usr').then((result)=>{
      let usr = result;
        updateLoader.present();
        this.howAreYouTodayService.getHemodialysisTreatment(usr,(result,err?)=>{
          if(result){
            let hemodialysisTreatment = result.hemodialysis_treatments.pop();
            let hemodialysisTreatmentID = hemodialysisTreatment.id;
            this.dailyVolumeMax = hemodialysisTreatment.current_water_limit;
            this.dailyVolume = hemodialysisTreatment.current_water_limit;
            this.cupNumber = this.checkCupNumbers(hemodialysisTreatment.current_water_limit);
            this.howAreYouTodayService.getDrinkAmout(hemodialysisTreatmentID, (result,err?)=>{
              if(result){
                for(let i = 0; i < result.drink_amounts.length; i++){
                  this.dailyVolumeProgress = (this.dailyVolumeProgress + this.transformValueToPercentage(result.drink_amounts[i].amount));
                  this.dailyVolume = this.dailyVolume - result.drink_amounts[i].amount;
                  this.cupNumber = this.checkCupNumbers(this.dailyVolume);
                }

                this.verifyBarColor();
                updateLoader.dismiss();
              }else{
                if(err.status == 401){
                  this.navCtrl.setRoot("LoginPage");
                  updateLoader.dismiss();
                }else{
                  updateLoader.dismiss();
                  this.navCtrl.push('InternetErrorPage');
                }
              };


            })

          }else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
              updateLoader.dismiss();
            }else{
              updateLoader.dismiss();
              this.navCtrl.push('InternetErrorPage');
            }
            console.log('error');
          };


      })
    })
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
    console.log('ionViewDidLoad HowAreYouTodayPage');
  }
  checkCupNumbers(volume: number): number{
    return (volume/200);
  };
  transformValueToPercentage(value: number): number{
    let onePercent: number;
    let percentage: number;
    onePercent = (this.dailyVolumeMax/100);
    percentage = (value / onePercent);
    return percentage;
  };
  verifyBarColor(){
    if(this.dailyVolume <= 0){
      document.getElementsByClassName('progress-inside').namedItem('inside-bar').setAttribute('data-color','red')
      this.dailyVolume = 0;
      this.cupNumber = 0;

      this.textLiquid = "";
      if(this.dailyVolume == 0){
        this.textStatus = this.translation.STATUS.TEXT3;
      }
      else{
        this.textStatus = this.translation.STATUS.TEXT4;
      }
    }else if(this.dailyVolume > (this.dailyVolumeMax * 0.2)){
      document.getElementsByClassName('progress-inside').namedItem('inside-bar').setAttribute('data-color','green');
      this.textStatus = this.translation.STATUS.TEXT1
      this.textLiquid = (Math.round(this.cupNumber*10)/10) +" "+ this.translation.STATUS.VOLUME +" (" + this.dailyVolume + " ml)";
    }else{
      document.getElementsByClassName('progress-inside').namedItem('inside-bar').setAttribute('data-color','yellow');
      this.textStatus = this.translation.STATUS.TEXT2;
      this.textLiquid = (Math.round(this.cupNumber*10)/10) +" " + this.translation.STATUS.VOLUME + " (" + this.dailyVolume + " ml)";
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
