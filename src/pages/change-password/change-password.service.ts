import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class ChangePasswordService extends ServiceModel{
  constructor(private http:HttpClient,public toastCtrl:ToastController,public storage: Storage){
    super();
    this.setToastCtrl(this.toastCtrl);
    this.storage.get('auth').then(
      (data) => {
        this.setAuth(data);
        console.log(this.getTeste());
      },
      (error) => {
        console.error(error);
      }
    );
  }
  putUserPassword(obj, callback){
    this.storage.get('usr').then((usr) =>{
      this.http.put(this.getUrl()+'/users/'+ usr.id, obj , {headers: this.getHeaderTk()})
      .subscribe((result) =>{
        this.storage.set('usr', result)
        callback(result);
      },
      (err: any)=>{
        console.log(err);
        callback(false,err);

      });
    },(error)=>{
      console.log(error);
    });

  }
  getTeste(){
    console.log(this.getHeaderTk());
  }


}
