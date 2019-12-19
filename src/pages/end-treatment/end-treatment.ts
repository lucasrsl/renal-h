import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';
import { EndTreatmentService } from './end-treatment-service';

/**
 * Generated class for the EndTreatmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-end-treatment',
  templateUrl: 'end-treatment.html',
})
export class EndTreatmentPage {
  treatmentID: number;
  treatmentType: number;
  buttonText: string = 'Realizei o transplante';
  usr: any;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public endTreatmentService: EndTreatmentService, public events: Events, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get('END_TREATMENT').subscribe((res)=>{
      this.translation = res;
    });
    this.storage.get('usr').then((usr)=>{
      this.usr = usr;
      if(usr.hemodialysis_treatments.length !=0 ){
        this.treatmentType = 1;
        this.treatmentID = usr.hemodialysis_treatments.pop().id;
        this.buttonText = this.translation.BUTTON_TREATMENT.OPTION_1;
      }else if(usr.transplant_treatments.length != 0){
        this.treatmentType = 2;
        this.treatmentID = usr.transplant_treatments.pop().id;
        this.buttonText = this.translation.BUTTON_TREATMENT.OPTION_2;
      }else if(usr.user_type == 3){
        this.treatmentType = 3;
        this.endTreatmentService.getConservativeTreatment(usr,(result,err?)=>{
          if(result){
            this.treatmentID = result.id;
          }else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
            }else{
              this.navCtrl.push('InternetErrorPage');
            }
          }

        });
        this.buttonText = this.translation.BUTTON_TREATMENT.OPTION_2;
      };
      /*this.endTreatmentService.getTransplantTreatment(usr,(result)=>{
        if(result){
          if(result.transplant_treatments.length != 0){
            this.treatmentType = 2;
            this.treatmentID = result.transplant_treatments.pop().id;
            this.buttonText = 'Farei hemodiálise';
          }
        }
      })*/
      /*this.endTreatmentService.getHemodialysisTreatment(usr,(result)=>{
        if(result){
          if(result.hemodialysis_treatments.length != 0){
            this.treatmentType = 1;
            this.treatmentID = result.hemodialysis_treatments.pop().id;
            this.buttonText = 'Realizei o transplante';
          }
        }
      })*/
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndTreatmentPage');
  }
  clickButton(){
    let treatment;
    if(this.buttonText == this.translation.BUTTON_TREATMENT.OPTION_2){
      treatment = 1;
    }else if(this.buttonText == this.translation.BUTTON_TREATMENT.OPTION_1){
      treatment = 2;
    }
    const updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING
    });
    updateLoader.present();
    this.endTreatmentService.deleteTreatment(this.treatmentType,this.treatmentID, (result,err?)=>{

      if(result){
        this.endTreatmentService.sendAlert(this.translation.TOAST_MESSAGE_END_TREATMENT,"success");

        this.endTreatmentService.createTreatment(treatment, this.usr, (result,err?)=>{
          if(result){
            this.endTreatmentService.sendAlert(this.translation.TOAST_MESSAGE_SELECT_TREATMENT, "success");
              this.endTreatmentService.getUser(this.usr,(result,err?)=>{
                if(result){
                  this.events.publish('verifyUserType', treatment);
                  console.log('Tratamento Selecionado');
                  updateLoader.dismiss();
                  if(treatment == 1){
                    this.openPage('HowAreYouTodayPage');
                  }else{
                    this.openPage('TodaySchedulePage')
                  }
                }else{
                  if(err.status == 401){
                    this.navCtrl.setRoot("LoginPage");
                    updateLoader.dismiss();
                  }else{
                    this.navCtrl.push('InternetErrorPage');
                    updateLoader.dismiss();
                  }
                }
              });
          }else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
              updateLoader.dismiss();
            }else{
              this.navCtrl.push('InternetErrorPage');
              updateLoader.dismiss();
            }
          }
        });

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

    });
  }
  logout(){
    this.storage.remove('auth').then(
      (data) => {
        console.log(data);
        this.events.publish('activeMenu',false)
        this.navCtrl.setRoot('LoginPage');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  confirmTreatmentEnd(){
    let confirmEnd = this.alertCtrl.create({
      subTitle: this.translation.ALERT.TITLE,
      cssClass: 'alert-class',
      buttons: [
        {
          text: this.translation.ALERT.BUTTONS.CANCEL,
          handler: data => {
            console.log('CANCELAR clicked');
          }
        },
        {
          text: this.translation.ALERT.BUTTONS.OK,
          handler: data => {
            this.clickButton();
          }
        }
      ]
    });
    confirmEnd.present();
  }
  openPage(page: string){
    this.navCtrl.setRoot(page);
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
