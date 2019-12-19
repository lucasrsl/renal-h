import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService extends ServiceModel{
  constructor(private http:HttpClient,public toastCtrl:ToastController,public storage: Storage){
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
  putUser(obj, callback){
    this.storage.get('usr').then((usr) =>{
      this.http.put(this.getUrl()+'/users/'+ usr.id, obj , {headers: this.getHeaderTk()})
      .subscribe((result) =>{
        this.storage.set('usr', result)
        callback(result);
      },
      (err: any)=>{
        console.log(err);
        callback(false, err);

      });
    },(error)=>{
      console.log(error);
    });

  }


}
