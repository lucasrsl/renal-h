import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ServiceModel} from '../../providers/utils/service-model';
import { ToastController} from 'ionic-angular';

@Injectable()
export class QuizService extends ServiceModel {
  userId:any;
  constructor(public http: HttpClient, public storage: Storage, public toastCtrl: ToastController) {
    super();
    this.setToastCtrl(this.toastCtrl);
  }
  postQuizResult(obj,callback){
    this.http.post(this.getUrl() + "/quizzes",obj,{headers: this.getHeaderNoTk()})
    .subscribe((result)=>{
      callback(result);
    },(err)=>{
      callback(false,err);
    });
  }


}
