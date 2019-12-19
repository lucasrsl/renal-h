import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServiceTermService } from './service-term.service';

/**
 * Generated class for the ServiceTermPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-term',
  templateUrl: 'service-term.html',
})
export class ServiceTermPage {
  notPatitent: boolean = false;
  type: number;
  user: any;
  loadingCtrl: any;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public serviceTermService: ServiceTermService, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("SERVICE_TERM").subscribe((res)=>{
      this.translation = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceTermPage');
  }
  ionViewWillEnter(){
    this.type = this.navParams.get('type');
    if(this.type == 1){
      this.notPatitent = this.navParams.get("notPatient");
    }else if(this.type == 2){
      this.user = this.navParams.get("user");
      this.loadingCtrl = this.navParams.get("loadingCtrl");
    }
  }
  confirmTerm(){
    this.storage.set('term',true).then(()=>{
      if(this.type == 1){
        this.navCtrl.setRoot('LoginPage').then(()=>{
          if(this.notPatitent){
            this.navCtrl.push("NotPatientPage",{termAccepted: true});
          };
        });
      }else if(this.type == 2){
        let loading = this.loadingCtrl.create({
          content: this.translation.LOADING_MESSAGE
        });
        loading.present();
        this.serviceTermService.postUser(this.user,(result,err?)=>{
          if(result){
            this.serviceTermService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");
            console.log(result);
            loading.dismiss();
            this.navCtrl.setRoot('LoginPage');
          }else if(err.status == 422){
            this.navCtrl.popToRoot();
            this.serviceTermService.sendAlert(this.translation.TOAST_MESSAGE_ERROR, "error");
            loading.dismiss();
          }else{
            this.navCtrl.push('InternetErrorPage');
            loading.dismiss();
          }
        });
      }

    });
  }
  refuseTerm(){
    this.storage.set('term',false).then(()=>{
      if(this.notPatitent){
        this.navCtrl.setRoot('LoginPage').then(()=>{
          if(this.notPatitent){
            this.navCtrl.push("NotPatientPage",{termAccepted: false});
          };
        });
      }else{
        this.navCtrl.setRoot('LoginPage');
      };

    });
  }
  changeLanguage(lang){
    if(lang==1){
      this.translate.use('pt');
    }else if(lang==2){
      this.translate.use('en');
    }else if(lang==3){
      this.translate.use('es');
    }
  }

}
