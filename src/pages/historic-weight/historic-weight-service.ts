import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';

@Injectable()
export class HistoricWeightService extends ServiceModel {

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
  }
  getHemodialysisTreatment(obj,callback){
    this.http.get(this.getUrl()+ '/users/'+ obj.id + '/hemodialysis_treatments/',{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      //this.sendAlert(err.error.users[0],"error");
      callback(false,err);
    })
  }
  postExamRegistry(obj,treatmentID,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.post(this.getUrl()+ '/users/' + usr.id + '/hemodialysis_treatments/' + treatmentID + '/exam_registries', obj , {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  getDialysisSessions(treatmentID,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.get(this.getUrl() + '/users/' + usr.id + '/hemodialysis_treatments/' + treatmentID + '/dialysis_sessions', {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  deleteExamRegistries(examID,treatmentID,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.delete(this.getUrl() + '/users/' + usr.id + '/hemodialysis_treatments/' + treatmentID + '/exam_registries/'+ examID, {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(true);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }



}
