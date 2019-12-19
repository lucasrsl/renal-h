import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';

@Injectable()
export class QueryService extends ServiceModel {
  userId:any;
  constructor(public http: HttpClient, public storage: Storage, public toastCtrl: ToastController) {
    super();
    this.setToastCtrl(this.toastCtrl);
    this.storage.get('auth').then(
      (data) => {
        this.setAuth(data);
      },
      (error) => {
        console.error(error);
      }
    );
    this.storage.get('usr').then(
      (usr) => {
        this.userId = usr.id;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // getMedicalAppointment(obj,callback){
  //   this.http.get(this.getUrl()+ '/users/'+ obj.id + '/medical_appointments/',{headers: this.getHeaderTk()})
  //   .subscribe((result)=>{
  //     callback(result);
  //   },(err)=>{
  //     //this.sendAlert(err.error.users[0],"error");
  //     callback(false);
  //   })
  // }
  // putMedicalAppointment(obj,id,callback){
  //   this.storage.get('usr').then((usr)=>{
  //     this.http.put(this.getUrl()+ '/users/'+ usr.id + '/medical_appointments/' + id,obj,{headers: this.getHeaderTk()})
  //     .subscribe((result)=>{
  //
  //       callback(result);
  //     },(err)=>{
  //       //this.sendAlert(err.error.users[0],"error");
  //       callback(false);
  //     });
  //   })
  // }
  // postMedicalAppointment(obj,callback){
  //   this.storage.get('usr').then((usr)=>{
  //     this.http.post(this.getUrl()+ '/users/' + usr.id + '/medical_appointments/',obj,{headers: this.getHeaderTk()})
  //     .subscribe((result)=>{
  //
  //       callback(result);
  //     },(err)=>{
  //       //this.sendAlert(err.error.users[0],"error");
  //       callback(false);
  //     });
  //   })
  // }
  deleteMedicalAppointment(id,callback){
    this.http.delete(this.getUrl()+'/users/'+this.userId+'/medical_appointments/'+id, {headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      //this.sendAlert(err.error.users[0],"error");
      callback(false,err);
    });
  }


}
