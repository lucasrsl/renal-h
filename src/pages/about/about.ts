import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  showButton: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
    this.showButton = this.navParams.get('param');
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    if(!this.showButton){
      document.getElementById("navbarButton").className = "hide-button";
    }

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
