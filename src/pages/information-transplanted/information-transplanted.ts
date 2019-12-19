import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the InformationTransplantedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information-transplanted',
  templateUrl: 'information-transplanted.html',
})
export class InformationTransplantedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformationTransplantedPage');
  }
  openPage(page: string) {
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
