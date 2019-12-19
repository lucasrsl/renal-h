import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController } from 'ionic-angular';
// import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService extends ServiceModel{
  constructor(private http:HttpClient,public toastCtrl:ToastController,public storage: Storage){
    super();
    this.setToastCtrl(this.toastCtrl);
    console.log(this.getHeaderNoTk().get('Content-Type'));
  }
  postLogin(obj,callback){
    const options:any = {
      headers: this.getHeaderNoTk(),
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };
    this.http.post(this.getUrl()+'/auth/sign_in', obj, options)
    .subscribe(result => {
      let obj:any = result;
      console.log("ATRIBUTOS DO LOGIN");
      console.log(obj.headers.get('access-token'));
      console.log(obj.headers.get('client'));
      console.log(obj.headers.get('uid'));
      let auth = {
        tk:obj.headers.get('access-token'),
        client:obj.headers.get('client'),
        uid:obj.headers.get('uid'),
      }
      this.storage.set('auth', auth)
      .then(
        () => console.log('Stored item!1'),
        error => console.error('Error storing item', error)
      );
      this.storage.set('usr', obj.body)
      .then(
        () => console.log('Stored item!2'),
        error => console.error('Error storing item', error)
      );
      callback(obj.body);
		},
		(err: any) => {
      //this.sendAlert("","error");
      callback(false,err);
		});
  }
  postForgetPassword(obj,callback){
    this.http.post(`${this.getUrl()}/recover_password`, obj, {headers: this.getHeaderNoTk()})
    .subscribe((res)=>{
      callback(res);
    },
    (err)=>{
      callback(false,err);
    })
  }

}
