import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

@Injectable()
export class AddExamService extends ServiceModel{
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
  postExam(obj,callback){
    this.http.post(this.getUrl()+'/users/'+this.userId+"/medical_exams", obj, { headers: this.getHeaderTk() })
    .subscribe(result => {
      callback(result);
    },
    (err: any) => {
      //this.sendAlert(err.error.users[0],"error");
      callback(false,err);
    });
  }

}
