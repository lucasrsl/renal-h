import {HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceModel{
  public toast:any;
  public toastControl:any;
  public auth:any={tk:'',client:'',uid:''};
  public httpProvider: any;
  public checkingInternet: boolean = false;
  constructor(){}

  getUrl(){
    // return "http://renalhealth.unifor.br/api/v1";
    //return "http://172.18.9.249:3021/api/v1";
    return "http://renalhealthdev.unifor.br/api/v1";
  }
  getApiKey(){
    return "http://localhost:3000/api/v1/";
  }
  getHeaderTk(){
    let header = new HttpHeaders({
      'Content-Type':'application/json',
      'access-token':this.auth.tk,
      //'access-token': "aaaaaaaaaaa",
      'client':this.auth.client,
      'uid':this.auth.uid
    });

    return header;
  }
  getHeaderNoTk(){
    let header = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return header;
  }
  setToastCtrl(toastCtrl){
    this.toastControl = toastCtrl;
  }
  setHttpClient(httpProvider){
    this.httpProvider = httpProvider;
  }
  setAuth(auth){
    this.auth.tk = auth.tk;
    this.auth.client = auth.client;
    this.auth.uid = auth.uid;
  }

  sendAlert(msg,status){
    if(this.toast){
      this.toast.dismiss();
    }
    setTimeout(()=>{
      this.toast = this.toastControl.create({
        message: msg,
        duration: 3000,
        cssClass:"toast-alert "+status,
        showCloseButton: true,
        closeButtonText: "X",
        position:"bottom"
      });
      // toast.onDidDismiss(() => {});
      this.toast.present();
    },500)
  }
  //checkInternet(internet){
  //  console.log("teste");
  //  if(!this.checkingInternet){
  //    if(!internet){
  //      this.ping(this.checkInternet);
  //    };
  //  }
  //
  //}
  setCheckingInternet(value){
    this.checkingInternet = value;
  }
  getCheckingInternet(){
    return this.checkingInternet;
  }
  checkInternet(callback){
    //let xhttp = new XMLHttpRequest();
    //xhttp.onload = function(){
    //  console.log(xhttp.response);
    //};
    //xhttp.open('post','8.8.8.8',true);
    //xhttp.send('teste');
    this.httpProvider.post(this.getUrl() + '/cities',{"nome":"Distrito Federal"},{headers: this.getHeaderNoTk()})
      .subscribe((res)=>{
        if(res){
          console.log("com internet");
          callback();
        };
      },(err)=>{
        console.log("sem internet");
        setTimeout(()=>{
          this.checkInternet(callback);
        },5000);
    });
  }


}
