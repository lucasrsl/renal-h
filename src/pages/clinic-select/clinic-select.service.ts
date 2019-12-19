import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';
import { ServiceModel } from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class ClinicSelectService extends ServiceModel{
  constructor(private http:HttpClient,public toastCtrl:ToastController,public storage: Storage){
    super();
    this.setToastCtrl(this.toastCtrl);
  }
  getCitys(obj,callback){
    this.http.post(this.getUrl()+'/cities', obj, { headers: this.getHeaderNoTk() })
    .subscribe(result => {
      callback(result);
		},
		(err: any) => {
      //this.sendAlert(err.error.users[0],"error");
      callback(false);
		});
  }
  postUser(obj,callback){
    this.http.post(this.getUrl()+'/users', obj, { headers: this.getHeaderNoTk() })
    .subscribe(result => {
      callback(true);
		},
		(err: any) => {
      //this.sendAlert(err.error.users[0],"error");
      callback(false,err);
		});
  }


}
