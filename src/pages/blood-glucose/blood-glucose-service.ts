import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';

@Injectable()
export class BloodGlucoseService extends ServiceModel {
  historicType: string;
  treatmentType: string;
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
  setTreatment(treatment){
    this.treatmentType = treatment;
    if(treatment == 'transplant_treatments'){
      this.historicType = 'glucose_levels';
    }else{
      this.historicType = 'glucose_level_conservatives';
    }
  }
  getTreatment(obj,callback){
    this.http.get(this.getUrl() + `/users/${obj.id}/${this.treatmentType}/`,{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      //this.sendAlert(err.error.users[0],"error");
      callback(false,err);
    })
  }
  postBloodGlucose(obj,treatmentID,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.post(this.getUrl()+ '/users/' + usr.id + '/'+ this.treatmentType +'/' + treatmentID + '/'+ this.historicType, obj , {headers: this.getHeaderTk()})
      .subscribe((result)=>{

        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  getBloodGlucose(treatmentID,callback){


    this.storage.get('usr').then((usr)=>{
      this.http.get(this.getUrl() + `/users/${usr.id}/${this.treatmentType}/${treatmentID}/${this.historicType}`, {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  deleteBloodGlucose(bloodGlucoseID,treatmentID,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.delete(this.getUrl() + `/users/${usr.id}/${this.treatmentType}/${treatmentID}/${this.historicType}/${bloodGlucoseID}`, {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }



}
