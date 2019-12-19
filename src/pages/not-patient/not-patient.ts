import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the NotPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-not-patient',
  templateUrl: 'not-patient.html',
})
export class NotPatientPage {
  cardInfo: boolean = false;
  cardTestes:  boolean = false;
  termAccepted: boolean = false;
  showMenu: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private translate: TranslateService) {
    this.termAccepted = this.navParams.get('termAccepted');
    this.showMenu = this.navParams.get('menu');
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotPatientPage');
    if(!this.termAccepted){
      let buttons = document.getElementsByClassName('term-needed');
      for(let i = 0; i< buttons.length; i++){
        let temp = <HTMLInputElement> buttons[i];
        temp.disabled = true;
        }
    }else{
      let buttons = document.getElementsByClassName('term-needed');
      for(let i = 0; i< buttons.length; i++){
        let temp = <HTMLInputElement> buttons[i];
        temp.disabled = false;
      }
    }
  }
  showCardInfo(){
    this.cardInfo = !this.cardInfo;
  }
  showCardTestes(){
    this.cardTestes = !this.cardTestes;
  }
  openPage(page: string){
    this.navCtrl.push(page);
  }
  openModal(page: string){
    let pageModal = this.modalCtrl.create(page,null,{showBackdrop: true, enableBackdropDismiss: true})
    pageModal.present();
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
