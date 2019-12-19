import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeightControlService } from './weight-control-service';

/**
 * Generated class for the WeightControlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weight-control',
  templateUrl: 'weight-control.html',
})
export class WeightControlPage {
  checkboxSession: boolean[] = [false,false,false,false];
  dryWeight: number;
  actualWeight: number;
  selectedCheckbox: number;
  validWeight: boolean = false;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public storage: Storage, public weightControlService: WeightControlService, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("WEIGHT_CONTROL").subscribe((res)=>{
      this.translation = res;
    });
  }

  ionViewDidLoad(){
    console.log(document.getElementById('btn-calc-weight').style.marginTop = this.verifyMargin() + 'px');
  }
  sendWeightData(obj,callback){
    this.storage.get('usr').then((usr)=>{
      this.weightControlService.getHemodialysisTreatment(usr,(result,err?)=>{
        if(result){
          let hemodialysisTreatmentID = result.hemodialysis_treatments.pop().id;
          this.weightControlService.postDialysisSession(obj,hemodialysisTreatmentID,(result,err?)=>{
            if(result){
              this.weightControlService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");
              callback();
            }else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
              }else{
                this.navCtrl.push('InternetErrorPage');
              }
            };

          })
        }else{
          if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
          }else{
            this.navCtrl.push('InternetErrorPage');
          }
        }

      })
    })
  }
  verifyCheckbox(number: number,type: boolean){
    if(type == true){
      this.checkboxSession[number] = !this.checkboxSession[number];
    }

    for(let i = 0; i<4; i++){
      if(this.checkboxSession[number] == true){
        if(this.checkboxSession[number] == this.checkboxSession[i] && number - i !=0){
          this.checkboxSession[i] = false;
        }
      }
      if(this.checkboxSession[number] == true){
        this.selectedCheckbox = number;
      }
      else{
        this.selectedCheckbox = null;
      }

    }
    for(let i = 0; i<4; i++){
      if(i == number && this.checkboxSession[number] == true){
        document.getElementsByClassName('col-checkbox-text')[number].setAttribute('data-color','black');
      }
      else{
        document.getElementsByClassName('col-checkbox-text')[i].setAttribute('data-color','white');
      }
    }

    this.weightIsValid();

  }
  weightIsValid(){
    if(this.dryWeight != 0 && this.dryWeight != null && this.actualWeight != 0 && this.actualWeight != null && this.selectedCheckbox != null){
      this.validWeight = true;
    }
    else{
      this.validWeight = false;
    }
  }
  openInformation(){
    let information = this.alertCtrl.create({
      title: this.translation.ALERT.TITLE,
      cssClass: 'alert-class',
      message: '<p>'+ this.translation.ALERT.MESSAGE1 + '</p><p>' + this.translation.ALERT.MESSAGE2 + '</p>',
      buttons: [this.translation.ALERT.BUTTONS]
    })
    information.present();
  }
  calcWeightResult(){
    let dialysis_session = {
        current_weight: this.actualWeight,
        dry_weight: this.dryWeight,
        number_session: (this.selectedCheckbox+1)
    }
    this.sendWeightData(dialysis_session,()=>{
      let message;
      if(this.selectedCheckbox == 0){
        if(this.actualWeight> this.dryWeight*1.05){
          message = this.translation.RESULT._1;
        }
        else{
          message = this.translation.RESULT._2;
        }
      }
      else{
        if(this.actualWeight> this.dryWeight*1.03){
          message = this.translation.RESULT._1;
        }
        else{
          message = this.translation.RESULT._2;
        }
      }
      let result = this.alertCtrl.create({
        message: message,
        buttons: [this.translation.ALERT.BUTTONS],
        cssClass: 'alert-class'
      })
      result.onDidDismiss(()=>{
        this.navCtrl.pop();
      })
      result.present();
    });

  }
  verifyMargin(){
    let margin = (document.documentElement.clientHeight - document.getElementById('header-class').clientHeight
    - document.getElementById('grid-visual').clientHeight) - 126;
    return  margin;
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
