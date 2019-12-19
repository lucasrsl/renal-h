import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';

@Injectable()
export class ExamService extends ServiceModel {
  userId:any;
  constructor(public http: HttpClient, public storage: Storage, public toastCtrl: ToastController) {
    super();
    this.setToastCtrl(this.toastCtrl);
    this.storage.get('auth').then(
      (data) => {
        console.log("AQUI MARILEN OH");
        console.log(data);
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
  // getMedicalExam(obj,callback){
  //   this.http.get(this.getUrl()+ '/users/'+ obj.id + '/medical_exams/',{headers: this.getHeaderTk()})
  //   .subscribe((result)=>{
  //     callback(result);
  //   },(err)=>{
  //     //this.sendAlert(err.error.users[0],"error");
  //     callback(false);
  //   })
  // }
  deleteExam(idExam,callback){
    this.http.delete(this.getUrl()+'/users/'+this.userId+"/medical_exams/"+idExam,{ headers: this.getHeaderTk() })
    .subscribe((result: any) => {
      callback(true);
    },
    (err: any) => {
      callback(false,err);
    });
  }
  // putMedicalAppointment(obj,id,callback){
  //   this.storage.get('usr').then((usr)=>{
  //     this.http.put(this.getUrl()+ '/users/'+ usr.id + '/medical_appointments/' + id,obj,{headers: this.getHeaderTk()})
  //     .subscribe((result)=>{
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
  //       callback(result);
  //     },(err)=>{
  //       //this.sendAlert(err.error.users[0],"error");
  //       callback(false);
  //     });
  //   })
  // }
  // deleteMedicalAppointment(id,callback){
  //   this.storage.get('usr').then((usr)=>{
  //     this.http.delete(this.getUrl() + '/users/' + usr.id + '/medical_appointments/'+ id, {headers: this.getHeaderTk()})
  //     .subscribe((result)=>{
  //       callback(result);
  //     },(err)=>{
  //       //this.sendAlert(err.error.users[0],"error");
  //       callback(false);
  //     });
  //   });
  // }


}
