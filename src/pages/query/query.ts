import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { QueryService } from './query-service';
import {BddStorage} from '../../providers/utils/bdd-storage';
declare var document;

@IonicPage()
@Component({
  selector: 'page-query',
  templateUrl: 'query.html',
})
export class QueryPage {
  query: any[] = [];
  city: string;
  state: string;
  placeholderFlag: boolean = true;
  translation: any;
  bddLocal:BddStorage = new BddStorage();

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public queryService: QueryService,public modalCtrl: ModalController, private localNotifications: LocalNotifications, private translate: TranslateService) {
    // this.updateList();
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("QUERY").subscribe((res)=>{
      this.translation = res;
    });

  }
  ionViewWillEnter(){
    this.listDateQuery();
  }
  ionViewDidEnter(){

    this.checkAlarms();
  }
  listDateQuery(){
    this.query = [];
    this.bddLocal.get("appointment",(res)=>{
      let query = res;
      for(let item of query){
        item.dateHour = new Date(item.date_appointment).toLocaleString();
        this.query.push(item);
      }
      if(query.length > 0){
        this.placeholderFlag = false;
      }else{
        this.placeholderFlag = true;
      }
    });

  }
  openAddQuery(){
    this.navCtrl.push('AddQueryPage');
    // let addQuery = this.modalCtrl.create('AddQueryPage',{
    //   type: 'Adicionar'
    // })
    // addQuery.onDidDismiss(medical_appointments=>{
    //   if(medical_appointments != null){
    //     medical_appointments.city = this.city;
    //     medical_appointments.state = this.state;
    //     medical_appointments.date_appointment = (medical_appointments.date_appointment + ' ' + medical_appointments.hour);
    //     console.log(medical_appointments);
    //     this.queryService.postMedicalAppointment(medical_appointments,(result)=>{
    //       if(result){
    //         this.updateList();
    //       }
    //
    //     })
    //
    //   }
    // })
    // addQuery.present();


  }
  // deleteMedicalAppointment(id: number, index: number){
  //   this.queryService.deleteMedicalAppointment(id,(result)=>{
  //     this.query.splice(index,1);
  //     console.log(result.status);
  //   })
  //
  // }
  deleteQuery(query){
    this.queryService.deleteMedicalAppointment(query.id,(result,err?)=>{
      if(result){
        this.queryService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");
        this.bddLocal.removeItemById("appointment",query.id,()=>{
          this.listDateQuery();
        });

      }else{
        if(err.status == 401){
          this.navCtrl.setRoot("LoginPage");
        }else{
          this.navCtrl.push('InternetErrorPage');
        }
      };
    });
  }
  // putMedicalAppointment(id: number,index: number){
  //   let editQuery = this.modalCtrl.create('AddQueryPage',{
  //     type: 'Editar',
  //     data: this.query[index]
  //   })
  //   editQuery.onDidDismiss(medical_appointments=>{
  //     if(medical_appointments != null){
  //       let data = new Date(medical_appointments.date_appointment)
  //       medical_appointments.date_appointment = (data.getFullYear() + '-' + (data.getMonth()+1) + '-' + data.getDate() + ' ' + medical_appointments.hour);
  //       console.log(medical_appointments);
  //       this.queryService.putMedicalAppointment(medical_appointments, id ,(result=>{
  //         if(result){
  //           this.updateList();
  //         }
  //       })
  //       )
  //     }
  //
  //   })
  //   editQuery.present();
  // }
  // updateList(){
  //   this.storage.get('usr').then((usr)=>{
  //     this.city = usr.clinic_city;
  //     this.state = usr.clinic_state;
  //     this.queryService.getMedicalAppointment(usr,(result)=>{
  //       if(result){
  //         let listAppointments = result.medical_appointments;
  //         this.query.splice(0,listAppointments.length);
  //         for(let i = 0; i < listAppointments.length; i++){
  //           let date = new Date(listAppointments[i].date_appointment);
  //
  //           let info = {
  //             obj: listAppointments[i],
  //             hour: this.adjustTime(date),
  //             date: listAppointments[i].date_appointment
  //           }
  //           info.obj.date_appointment = (date.getDate() + '/' + (1+date.getMonth()) + '/' + date.getFullYear());
  //           this.query.push(info);
  //         }
  //       }
  //
  //     })
  //   })
  // }
  adjustTime(date){
    let time;
    if(date.getHours() < 10){
      if(date.getMinutes() < 10){
        time = '0' + date.getHours()+':0' + date.getMinutes();
      }
      else{
        time = '0' + date.getHours()+':' + date.getMinutes();
      }
    }
    else if(date.getMinutes()<10){
      time = date.getHours()+':0' + date.getMinutes();
    }
    else{
      time = date.getHours()+':' + date.getMinutes();
    }
    return time;
  }
  enableNotification(alarmes,id,idAlarm){
      let btnIcon:any = document.querySelectorAll("#"+id)[0];
      let alarm:any;
      this.bddLocal.getItemById("appointment",idAlarm,(res)=>{
        alarm = res;
        console.log(alarm);
        if(this.hasClass(btnIcon,"icon-disabled")){
          btnIcon.classList.remove("icon-disabled");
          alarm.notification = true;
          this.localNotifications.schedule(alarmes);
          this.bddLocal.setItemById('appointment',idAlarm,alarm);
          this.queryService.sendAlert(this.translation.ALARM.MESSAGE1,"success");

        }else{
          btnIcon.classList.add("icon-disabled");
          let ids:any = [];
          alarm.notification = false;
          for(let item of alarmes){
            ids.push(item.id);
          }
          this.localNotifications.cancel(ids).then(() => {
            this.queryService.sendAlert(this.translation.ALARM.MESSAGE2,"success");
          });
          this.bddLocal.setItemById('appointment',idAlarm,alarm);
        }
      });

    }
    hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
    }
    checkAlarms(){
      for(let i = 0; i < this.query.length; i++){
        if(this.query[i].notification == false){
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
