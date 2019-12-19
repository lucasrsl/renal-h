import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';

@Injectable()
export class BloodPressureService extends ServiceModel {
  treatmentType: string;
  historicType: string;
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
      this.historicType = 'blood_pressure_levels';
    }else{
      this.historicType = 'blood_pressure_level_conservatives';
    }
  }
  getTransplantTreatment(obj,callback){
    this.http.get(this.getUrl()+ '/users/'+ obj.id + '/'+ this.treatmentType +'/',{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      //this.sendAlert(err.error.users[0],"error");
      callback(false,err);
    })
  }
  postBloodPressure(obj,treatmentID,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.post(this.getUrl()+ '/users/' + usr.id + '/'+ this.treatmentType +'/' + treatmentID + '/' + this.historicType, obj , {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  getBloodPressure(treatmentID,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.get(this.getUrl() + '/users/' + usr.id + '/'+ this.treatmentType +'/' + treatmentID + '/' + this.historicType, {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  deleteBloodPressure(bloodPressureID,treatmentID,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.delete(this.getUrl() + '/users/' + usr.id + '/'+ this.treatmentType +'/' + treatmentID + '/' + this.historicType + '/' + bloodPressureID, {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }



}
