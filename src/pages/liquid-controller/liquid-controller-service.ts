import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';

/*
  Generated class for the LiquidControllerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LiquidControllerService extends ServiceModel {

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
  putHemodialysisTreatment(obj,id,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.put(this.getUrl()+ '/users/'+ usr.id + '/hemodialysis_treatments/' + id,obj,{headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      });
    })
  }
  postDrinkAmount(obj,id,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.post(this.getUrl()+ '/users/' + usr.id + '/hemodialysis_treatments/' + id + '/drink_amounts/',obj,{headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      });
    })
  }
  getDrinkAmout(id,callback){
    this.storage.get('usr').then((usr)=>{
      this.http.get(this.getUrl()+'/users/'+ usr.id + '/hemodialysis_treatments/'+ id + '/drink_amounts/',{headers: this.getHeaderTk()})
      .subscribe((result)=>{
        callback(result);
      },(err)=>{
        //this.sendAlert(err.error.users[0],"error");
        callback(false,err);
      })
    })
  }


}
