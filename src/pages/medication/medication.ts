import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, LoadingController } from 'ionic-angular';
import { MedicationService } from './medication.service';
import {BddStorage} from '../../providers/utils/bdd-storage';
import { TranslateService } from '@ngx-translate/core';
declare var document;

@IonicPage()
@Component({
  selector: 'page-medication',
  templateUrl: 'medication.html',
})
export class MedicationPage {
  button_alarm = false;
  pills: any[] = [];
  bddLocal:BddStorage = new BddStorage();
  flagNotification:boolean = true;
  placeholderFlag: boolean = true;
  fade: any;
  scrollContentHeight: number;
  listHeight:  number;
  actualScroll: number = 0;
  notificationText: string[] = [];
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public medicationService:MedicationService, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, private localNotifications: LocalNotifications, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("MEDICATIONS").subscribe((res)=>{
      this.translation = res
    });
  }

  ionViewWillEnter(){
    this.bddLocal.get("medications",(res)=>{
      console.log(this.pills);
      this.pills = res;
      if(this.pills.length > 0){
        this.placeholderFlag = false;
      }else{
        this.placeholderFlag = true;
      }
    });
  }
  ionViewDidEnter(){
    this.checkFade();
    this.checkAlarms();
  }
  ionViewDidLoad(){
    this.fade = document.getElementsByClassName('fade').item(0);
    this.scrollContentHeight = document.getElementsByClassName('scroll-content').item(1).clientHeight;

  }
  openAddMed(){
    this.navCtrl.push('AddMedPage');
  }
  openModal(page: string){
    let pageModal = this.modalCtrl.create(page,null,{showBackdrop: true, enableBackdropDismiss: true})
    pageModal.present();
  }
  editMed(alarme,id){
    //this.navCtrl.push('AddMedPage',{alarmMed:alarme});
    let pageModal = this.modalCtrl.create('AddMedPage',{alarmMed:alarme},{showBackdrop: true, enableBackdropDismiss: true})
    pageModal.onDidDismiss((data)=>{
      if(data){
        this.bddLocal.removeItemById("medications",id,()=>{
          this.bddLocal.get("medications",(res)=>{
            console.log('teste1');
            this.pills = res;
            console.log(res);
            this.checkAlarms();
          });
        });
      }
    })
    pageModal.present();
  }
  deleteMedications(med){
    this.medicationService.deleteMedications(med.id,(result,err?)=>{
      if(result){

        this.bddLocal.removeItemById("medications",med.id,(res)=>{
          console.log(res);
          this.pills = res;
          if(this.pills.length > 0){
            this.placeholderFlag = false;
          }else{
            this.placeholderFlag = true;
          }
          this.medicationService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");
          this.checkFade();
        });

      }else{
        if(err.status == 401){
          this.navCtrl.setRoot("LoginPage");
        }else{
          this.medicationService.sendAlert(this.translation.TOAST_MESSAGE_ERROR,"error");
          this.navCtrl.push('InternetErrorPage');
        }
      };
    });
  }
  enableNotification(alarmes,id,idAlarm){
    //let btnIcon:any = document.querySelectorAll("#btnAlarm"+id)[0];
    //console.log(btnIcon);
    let alarm:any;
    this.bddLocal.getItemById("medications",idAlarm,(res)=>{
      alarm = res;
      if(this.button_alarm){

        //btnIcon.classList.remove("icon-disabled");
        this.button_alarm = false;
        this.notificationText["btnAlarm"+id] = this.translation.ALARM.OPTION2;
        this.localNotifications.schedule(alarmes);
        this.medicationService.sendAlert(this.translation.ALARM.MESSAGE1,"success");
        alarm.notification = true;
        this.bddLocal.setItemById('medications',idAlarm,alarm);
        this.pills[id].notification = true;
      }else{
        //btnIcon.classList.add("icon-disabled");
        this.button_alarm = true;
        this.notificationText["btnAlarm"+id] = this.translation.ALARM.OPTION1;
        let ids:any = [];
        for(let item of alarmes){
          ids.push(item.id);
        }

        alarm.notification = false;
        this.bddLocal.setItemById('medications',idAlarm,alarm);
        this.localNotifications.cancel(ids).then(() => {
          this.medicationService.sendAlert(this.translation.ALARM.MESSAGE2,"success");
        });
        this.pills[id].notification = false;
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
  showOptions(med: any, index: number,idAlarm){
    const options = this.actionSheetCtrl.create({
      title: this.translation.ALARM_OPTIONS.TITLE,
      buttons: [
        {
          text: this.translation.ALARM_OPTIONS.OPTIONS._1,
          icon: 'trash',
          role: 'delete',
          handler: ()=>{
            this.deleteMedications(med);

          }

        },
        {
          text: this.notificationText['btnAlarm' + index],
          icon: 'notifications',
          handler: ()=>{
            this.enableNotification(med.alarms,index,med.id);
          }
        },
        {
          text: this.translation.ALARM_OPTIONS.OPTIONS._2,
          icon: 'create',
          handler: ()=>{
            this.editMed(med,med.id);
          }
        },
        {
          text: this.translation.ALARM_OPTIONS.OPTIONS._3,
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    options.present();
  }
  checkAlarms(){
    console.log("teste2");
    for(let i = 0; i < this.pills.length; i++){
      console.log(this.pills[i]);
      if(this.pills[i].notification == false){
        this.notificationText['btnAlarm'+ i] = this.translation.ALARM.OPTION1;
        // document.getElementById('btnAlarm'+i).classList.add("icon-disabled");
        this.button_alarm = true;
        console.log(document.getElementById('btnAlarm'+i));
      }else if(this.pills[i].notification == true){
        this.notificationText['btnAlarm'+ i] = this.translation.ALARM.OPTION2;
        // document.getElementById('btnAlarm'+i).classList.remove("icon-disabled");
        this.button_alarm = false;
        console.log(document.getElementById('btnAlarm'+i));
      };
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
