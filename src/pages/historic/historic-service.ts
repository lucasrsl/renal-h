import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';

@Injectable()
export class HistoricService extends ServiceModel {

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
  getTreatment(obj,treatment,callback){
    this.http.get(this.getUrl() + `/users/${obj.id}/${treatment}/`,{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      //this.sendAlert(err.error.users[0],"error");
      callback(false,err);
    })
  }
  postWeight(obj,treatmentID,treatment,callback){
    let treatmentType;
    if(treatment == 'transplant_treatments'){
      treatmentType = 'transplanted_weights';
    }else{
      treatmentType = 'conservative_weights';
    }

    this.storage.get('usr').then((usr)=>{
      this.http.post(this.getUrl() + `/users/${obj.id}/${treatment}/${treatmentID}/${treatmentType}`, obj , {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  getWeight(treatmentID,treatment,callback){
    let treatmentType;
    if(treatment == 'transplant_treatments'){
      treatmentType = 'transplanted_weights';
    }else{
      treatmentType = 'conservative_weights';
    }
    this.storage.get('usr').then((usr)=>{
      this.http.get(this.getUrl() + `/users/${usr.id}/${treatment}/${treatmentID}/${treatmentType}`, {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  postBloodGlucose(obj,treatmentID,treatment,callback){
    let treatmentType;
    if(treatment == 'transplant_treatments'){
      treatmentType = 'glucose_levels';
    }else{
      treatmentType = 'glucose_level_conservatives';
    }
    this.storage.get('usr').then((usr)=>{
      this.http.post(this.getUrl() + `/users/${usr.id}/${treatment}/${treatmentID}/${treatmentType}`, obj , {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  getBloodGlucose(treatmentID,treatment,callback){
    let treatmentType;
    if(treatment == 'transplant_treatments'){
      treatmentType = 'glucose_levels';
    }else{
      treatmentType = 'glucose_level_conservatives';
    }
    this.storage.get('usr').then((usr)=>{
      this.http.get(this.getUrl() + `/users/${usr.id}/${treatment}/${treatmentID}/${treatmentType}`, {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  postBloodPressure(obj,treatmentID,treatment,callback){
    let treatmentType;
    if(treatment == 'transplant_treatments'){
      treatmentType = 'blood_pressure_levels';
    }else{
      treatmentType = 'blood_pressure_level_conservatives';
    }
    this.storage.get('usr').then((usr)=>{
      this.http.post(this.getUrl() + `/users/${usr.id}/${treatment}/${treatmentID}/${treatmentType}`, obj , {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  getBloodPressure(treatmentID,treatment, callback){
    let treatmentType;
    if(treatment == 'transplant_treatments'){
      treatmentType = 'blood_pressure_levels';
    }else{
      treatmentType = 'blood_pressure_level_conservatives';
    }
    this.storage.get('usr').then((usr)=>{
      this.http.get(this.getUrl() + `/users/${usr.id}/${treatment}/${treatmentID}/${treatmentType}`, {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  postCreatinine(obj,treatmentID,treatment,callback){
    let treatmentType;
    if(treatment == 'transplant_treatments'){
      treatmentType = 'creatinine_levels';
    }else{
      treatmentType = 'creatinine_level_conservatives';
    }
    this.storage.get('usr').then((usr)=>{
      this.http.post(this.getUrl()+ '/users/' + usr.id + '/'+ treatment + '/' + treatmentID + '/'+ treatmentType, obj , {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }
  getCreatinine(treatmentID,treatment,callback){
    let treatmentType;
    if(treatment == 'transplant_treatments'){
      treatmentType = 'creatinine_levels';
    }else{
      treatmentType = 'creatinine_level_conservatives';
    }
    this.storage.get('usr').then((usr)=>{
      this.http.get(this.getUrl()+ '/users/' + usr.id + '/'+ treatment + '/' + treatmentID + '/'+ treatmentType , {headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }



}
