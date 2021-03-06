import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Injectable()
export class SignUpService extends ServiceModel{
  constructor(private http:HttpClient,public toastCtrl:ToastController){
    super();
    this.setToastCtrl(this.toastCtrl);
    console.log(this.getHeaderNoTk().get('Content-Type'));
  }
  postUser(obj,callback){
    this.http.post(this.getUrl()+'/users', obj, { headers: this.getHeaderNoTk() })
    .subscribe(result => {
      callback(true);
		},
		(err: any) => {
      //this.sendAlert(err.error.users[0],"error");
      callback(false);
		});
  }

}
