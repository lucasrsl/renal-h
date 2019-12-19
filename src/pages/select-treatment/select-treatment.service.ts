import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController } from 'ionic-angular';
// import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class SelectTreatmentService extends ServiceModel{
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
  /*postLogin(obj,callback){
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
      this.setAuth(auth);
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
      this.sendAlert("Usuário conectado com sucesso","success");
      callback(obj.body);
		},
		(err: any) => {
      console.log(err);
      this.sendAlert(err.error.errors[0],"error");
      callback(false);
		});
  }*/
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
  createHemodialysisTreatment(usr,callback){
    this.http.post(this.getUrl() + '/users/'+ usr.id + '/hemodialysis_treatments',{},{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result)
    },(err)=>{
      this.sendAlert(err.error.users[0], "error");
      callback(false,err);
    })
  }
  createTransplantTreatment(usr,callback){
    this.http.post(this.getUrl() + '/users/'+ usr.id + '/transplant_treatments',{},{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result)
    },(err)=>{
      this.sendAlert(err.error.users[0], "error");
      callback(false,err);
    })
  }
  createConservativeTreatment(usr,callback){
    this.http.post(this.getUrl() + '/users/'+ usr.id + '/conservative_treatments',{},{headers: this.getHeaderTk()})
    .subscribe((result)=>{
      callback(result)
    },(err)=>{
      this.sendAlert(err.error.users[0], "error");
      callback(false,err);
    })
  }
}
