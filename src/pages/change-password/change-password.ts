import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Platform } from 'ionic-angular';
import { ChangePasswordService } from './change-password.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  updatePassword: FormGroup;
  passwordValid: boolean = false;
  full_name: string;
  toast: any;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public FormBuilder: FormBuilder, public passwordChangeService: ChangePasswordService, public storage: Storage, public renderer: Renderer, public viewCtrl: ViewController, public toastCtrl: ToastController, public translate: TranslateService, private platform: Platform) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement,'change-password-popup',true);
    this.initUpdatePassword();
    this.storage.get('usr').then((usr)=>{
      this.full_name = usr.full_name;
    });
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
    this.translate.get("CHANGE_PASSWORD").subscribe((res)=>{
      this.translation = res;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
    if(this.platform.is('ios')){
      this.adjustModalIos('change-password-popup');
    };
  }
  initUpdatePassword(){
    this.updatePassword = this.FormBuilder.group({
      full_name: [this.full_name],
      password: ['',[Validators.required,Validators.minLength(8)]],
      passwordConf: ['',[Validators.required,Validators.minLength(8)]]
    }, {validator: this.matchingPasswords('password','passwordConf')});

  }
  matchingPasswords(passwordKey: string, passwordConfKey: string){
    return (group: FormGroup): {[key: string]: any} =>{
      let password = group.controls[passwordKey];
      let passwordConf = group.controls[passwordConfKey];
      if(password.value !== passwordConf.value){
        this.passwordValid = true;
        return{
          mismatchedPasswords: true
        };
      }
      this.passwordValid = false;
    }
  };
  changePassword(){
    let message;
    this.translate.get("ERROR_MESSAGE").subscribe((res)=>{
      message = res;
    })
    if(this.updatePassword.invalid){
      this.sendAlert(message,'error');
      this.viewCtrl.dismiss();
    }else{
      this.updatePassword.value.full_name = this.full_name;
      let obj = {
        user: this.updatePassword.value
      }
      console.log(obj);
      this.passwordChangeService.putUserPassword(obj,(result,err?)=>{
        if(result){
          this.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS, "success");
          this.viewCtrl.dismiss();
        }else{
          if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
            this.sendAlert(this.translation.TOAST_MESSAGE_ERROR, "error");
          }else{
            this.sendAlert(this.translation.TOAST_MESSAGE_ERROR, "error");
            this.navCtrl.push('InternetErrorPage');
          }

        }
      })
    }

  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  sendAlert(msg,status){
    if(this.toast){
      this.toast.dismiss();
    }
    setTimeout(()=>{
      this.toast = this.toastCtrl.create({
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
  changeLanguage(lang){
    if(lang==1){
      this.translate.use('pt');
    }else if(lang==2){
      this.translate.use('en');
    }else if(lang==3){
      this.translate.use('es');
    }
  }
  adjustModalIos(page: string){
    let elementArray = document.querySelector(`.${page}`).getElementsByClassName('statusbar-padding');
    let lenghtArray = elementArray.length;
    for(let i = 0; i < lenghtArray; i++){
      if(elementArray[0].tagName == 'ION-NAVBAR'){
        elementArray[0].className = 'toolbar toolbar-ios';
      }else{
        elementArray[0].className = 'content content-ios';
      };
    };
  }
}
