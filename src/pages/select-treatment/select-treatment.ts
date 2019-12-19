import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { SelectTreatmentService } from './select-treatment.service';

/**
 * Generated class for the SelectTreatmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-treatment',
  templateUrl: 'select-treatment.html',
})
export class SelectTreatmentPage {
  //usr: any;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public selectTreatmentService: SelectTreatmentService, public events: Events, public storage: Storage, public loadingCtrl: LoadingController, private translate: TranslateService) {
    //this.usr = this.navParams.get('usr');
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("SELECT_TREATMENT").subscribe((res)=>{
      this.translation = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTreatmentPage');
  }
  selectTreatment(type: number){
    const updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    updateLoader.present();
    if(type == 1){
      this.storage.get('usr').then((usr)=>{

        this.selectTreatmentService.createHemodialysisTreatment(usr,(result,err?)=>{

          if(result){
            this.selectTreatmentService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");
            this.selectedTypePage('HowAreYouTodayPage',type);
            this.selectTreatmentService.getUser(usr,(result,err?)=>{
              if(result){
                console.log('Tratamento Selecionado');
                updateLoader.dismiss();
              }else{
                if(err.status == 401){
                  this.navCtrl.setRoot("LoginPage");
                  updateLoader.dismiss();
                }else{
                  this.navCtrl.push('InternetErrorPage');
                  updateLoader.dismiss();
                }
              }
            })
          }else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
              updateLoader.dismiss();
            }else{
              this.navCtrl.push('InternetErrorPage');
              updateLoader.dismiss();
            }
          }
        })
      },(err)=>{
        console.log(err);
      })

    }
    else if(type == 2){
      this.storage.get('usr').then((usr)=>{
        this.selectTreatmentService.createTransplantTreatment(usr,(result,err?)=>{
          if(result){
            this.selectTreatmentService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS, "success");
            this.selectedTypePage('TodaySchedulePage',type);
            this.selectTreatmentService.getUser(usr,(result,err?)=>{
              if(result){
                console.log('Tratamento Selecionado');
                updateLoader.dismiss();
              }
              else{
                if(err.status == 401){
                  this.navCtrl.setRoot("LoginPage");
                  updateLoader.dismiss();
                }else{
                  this.navCtrl.push('InternetErrorPage');
                  updateLoader.dismiss();
                }
              }
            })
          }
          else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
              updateLoader.dismiss();
            }else{
              this.navCtrl.push('InternetErrorPage');
              updateLoader.dismiss();
            }
          }
        })
      },(err)=>{
        console.log(err);
      })

    }
    else if(type == 3){
      this.storage.get('usr').then((usr)=>{
        this.selectTreatmentService.createConservativeTreatment(usr,(result,err?)=>{
          if(result){
            this.selectTreatmentService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS, "success");
            this.selectedTypePage('TodaySchedulePage',type);
            this.selectTreatmentService.getUser(usr,(result,err?)=>{
              if(result){
                console.log('Tratamento Selecionado');
                updateLoader.dismiss();
              }
              else{
                if(err.status == 401){
                  this.navCtrl.setRoot("LoginPage");
                  updateLoader.dismiss();
                }else{
                  this.navCtrl.push('InternetErrorPage');
                  updateLoader.dismiss();
                }
              }
            })
          }
          else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
              updateLoader.dismiss();
            }else{
              this.navCtrl.push('InternetErrorPage');
              updateLoader.dismiss();
            }
          }
        })
      },(err)=>{
        console.log(err);
      })

    }
    /*let usr ={
      email: this.usr.email,
      password: this.usr.password,
      user_type: type

    };
    /*this.selectTreatmentService.postLogin(usr,(result)=>{
      if(result){
        this.selectTreatmentService.getUser(result,(result)=>{
          if(result){
            this.events.publish('activeMenu', true);
            this.events.publish('verifyUserType', result.user_type)
            if(result.user_type == 1){
              this.openPage('HowAreYouTodayPage');
            }
            else if(result.user_type == 2){
              this.openPage('HistoricPage');
            }
            else{
              this.openPage('HowAreYouTodayPage');
            }

          }
          console.log(result.user_type);
        })


      }

    });*/
  }
  openPage(page: string){
    this.navCtrl.setRoot(page);
  }
  selectedTypePage(page: string,type: number){
    this.events.publish('activeMenu', true);
    this.events.publish('verifyUserType', type);
    this.openPage(page);
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
