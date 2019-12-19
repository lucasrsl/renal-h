import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController, UrlSerializer} from 'ionic-angular';

/*
  Generated class for the LiquidControllerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EndTreatmentService extends ServiceModel {

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
  /*getHemodialysisTreatment(obj,callback){
    this.http.get(this.getUrl()+ '/users/'+ obj.id + '/hemodialysis_treatments/',{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      //this.sendAlert(err.error.users[0],"error");
      callback(false);
    })
  }
  getTransplantTreatment(obj,callback){
    this.http.get(this.getUrl()+ '/users/'+ obj.id + '/transplant_treatments/',{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      //this.sendAlert(err.error.users[0],"error");
      callback(false);
    })
  }*/
  getConservativeTreatment(obj,callback){
    this.http.get(this.getUrl() + /users/+ obj.id + "/conservative_treatments",{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      callback(false,err);
    });
  }
  deleteTreatment(type,id,callback){
    let treatment = "hemodialysis_treatments";
    if(type == 2){
      treatment = "transplant_treatments";
    }else if(type == 3){
      treatment = "conservative_treatments";
    }
    this.storage.get('usr').then((usr)=>{
      this.http.delete(this.getUrl()+ '/users/'+ usr.id + `/${treatment}/` + id,{headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })

  }
  /*deleteTransplantedTreatment(id,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.delete(this.getUrl()+ '/users/'+ usr.id + '/transplant_treatments/' + id,{headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false);
      })
    })

  }*/
  createTreatment(type,usr,callback){
    let treatment = "hemodialysis_treatments";
    if(type == 2){
      treatment = "transplant_treatments";
    }else if(type == 3){
      treatment = "conservative_treatments";
    }
    this.http.post(this.getUrl() + `/users/${usr.id}/${treatment}`,{},{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result)
    },(err)=>{
      this.sendAlert(err.error.users[0], "error");
      callback(false,err);
    })
  }
  getUser(obj,callback){

    this.http.get(this.getUrl()+ '/users/'+ obj.id,{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      this.storage.set('usr', result)
      .then(
        () => console.log('Stored item!2'),
        error => console.error('Error storing item', error)
      );
      callback(result);
    },(err)=>{
      //this.sendAlert(err.error.users[0],"error");
      callback(false,err);
    })

  }



}
