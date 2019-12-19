import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class MedicationService extends ServiceModel{
  userId:any;
  constructor(private http:HttpClient,public toastCtrl:ToastController, private storage:Storage){
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
  getMedications(callback){
    this.storage.get('usr').then(
      (usr) => {
        console.log(usr.id);
        this.http.get(this.getUrl()+'/users/'+this.userId+"/medications", { headers: this.getHeaderTk() })
        .subscribe((result: any) => {
          let medications:any = result.medications;
          console.log("lista de medicacao");
          console.log(result);
          callback(medications);
        },
        (err: any) => {
          //this.sendAlert(err.error.users[0],"error");
          callback(false);
        });
      },
      (err) => {
        console.error(err);
        callback(false,err);
      }
    );
  }
  deleteMedications(idMed,callback){
    console.log("header aq marilene");
    console.log(this.getHeaderTk());
    this.http.delete(this.getUrl()+'/users/'+this.userId+"/medications/"+idMed,{ headers: this.getHeaderTk() })
    .subscribe((result: any) => {
      callback(true);
    },
    (err: any) => {
      callback(false,err);
    });
  }

}
