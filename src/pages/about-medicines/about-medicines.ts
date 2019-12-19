import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

/**
 * Generated class for the AboutMedicinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-medicines',
  templateUrl: 'about-medicines.html',
})
export class AboutMedicinesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService, public modalCtrl: ModalController) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutMedicinesPage');
  }
  openPage(page: string){
    this.navCtrl.push(page);
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
  openModal(page: string){
    let pageModal = this.modalCtrl.create(page,null,{showBackdrop: true, enableBackdropDismiss: true})
    pageModal.present();
  }

}
