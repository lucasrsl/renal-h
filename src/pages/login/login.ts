import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, LoadingController, ToastController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm:FormGroup;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private formBuilder: FormBuilder, private loginService: LoginService, public events:Events, public loadingCtrl: LoadingController, public storage: Storage, private toastCtrl: ToastController, private translate: TranslateService, private statusBar: StatusBar, private platform: Platform){
      if(localStorage.getItem("language")){
        this.changeLanguage(parseInt(localStorage.getItem("language")));
      };
      this.translate.get("LOGIN").subscribe((res)=>{
        this.translation = res;
      });
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        password: ['', [Validators.required,Validators.minLength(8)]]
      });
  }
  ionViewDidEnter(){
    if(this.platform.is('ios')){
      this.statusBar.hide();
    }
  }
  ionViewWillLeave(){
    if(this.platform.is('ios')){
      this.statusBar.show();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  pushSignUp(){
    this.navCtrl.push('SignUpPage');
  }
  pushNotPatient(){
    this.storage.get('term').then((value)=>{
      if(value){
        this.navCtrl.push('NotPatientPage',{termAccepted: true});
      }else{
        this.navCtrl.push('ServiceTermPage',{type: 1, notPatient: true});
      };
    });


  }
  openPage(page: string){
    this.navCtrl.push(page,{param: false});
  }
  postLogin(){
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    let usr = this.loginForm.value;
    //this.navCtrl.push('SelectTreatmentPage', {usr})
    updateLoader.present();
    this.loginService.postLogin(usr,(result,err?)=>{
      if(result){
        this.loginService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");
        if(result.user_type == 1){
          this.openPage('HowAreYouTodayPage');
          this.events.publish('activeMenu', true);
          this.events.publish('verifyUserType', result.user_type);
        }
        else if(result.user_type == 2){
          this.openPage('TodaySchedulePage');
          this.events.publish('activeMenu', true);
          this.events.publish('verifyUserType', result.user_type);
        }
        else if(result.user_type == 3){
          this.openPage('TodaySchedulePage');
          this.events.publish('activeMenu', true);
          this.events.publish('verifyUserType', result.user_type);
        }
        else{
          this.navCtrl.push('SelectTreatmentPage');
        }
        updateLoader.dismiss();

      }
      else{
        let message = this.translation.TOAST.MESSAGE.OPTION1;
        console.log(err.status);
        if(err.status == 0){
          message = this.translation.TOAST.MESSAGE.OPTION2
        };
        let error = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: "X",
          cssClass: 'toast-alert error'
        });
        error.present();
        updateLoader.dismiss();
      }
      console.log(result.user_type);
    });
  }
  forgetPassword() {
    let regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });

    const forgetPassword = this.alertCtrl.create({
      title: this.translation.ALERT.TITLE,
      message: this.translation.ALERT.MESSAGE,
      cssClass: 'alert-class',
      inputs: [
        {
          name: 'email',
          placeholder: 'exemplo@gmail.com',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: this.translation.ALERT.BUTTONS.OPTION1,
          handler: data => {
            console.log('CANCELAR clicked');
          }
        },
        {
          text: this.translation.ALERT.BUTTONS.OPTION2,
          handler: data => {
            if(regexp.test(data.email)){
              updateLoader.present();
              this.loginService.postForgetPassword(data,(res,err?)=>{
                if(res){
                  this.loginService.sendAlert(this.translation.ALERT.ERROR.SUCCESS, "success");
                }else{
                  if(err.status == 403){
                    this.loginService.sendAlert(this.translation.ALERT.ERROR.FAIL_1, "error");
                  }else{
                    this.navCtrl.push('InternetErrorPage',{hideSideMenu: true});
                  }
                }
                updateLoader.dismiss();
              });
            }else{
              this.loginService.sendAlert(this.translation.ALERT.ERROR.FAIL_2, "error");
            }
          }
        }
      ]
    });
    forgetPassword.present();
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
