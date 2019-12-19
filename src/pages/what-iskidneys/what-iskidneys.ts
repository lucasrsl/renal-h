import { TranslateService } from '@ngx-translate/core';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the WhatIskidneysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-what-iskidneys',
  templateUrl: 'what-iskidneys.html',
})
export class WhatIskidneysPage {
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public renderer: Renderer, public viewCtrl: ViewController, private platform: Platform, private translate: TranslateService) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'page-popup',true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("WHAT_ISKIDNEYS").subscribe((res)=>{
      this.translation = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatIskidneysPage');
    if(this.platform.is('ios')){
      this.adjustModalIos('page-popup');
    };
  }
  openInformation(){
    let information = this.alertCtrl.create({
      title: this.translation.ALERT.TITLE,
      cssClass: 'alert-class',
      message: '<p>'+ this.translation.ALERT.MESSAGE1 +'</p><p>'+ this.translation.ALERT.MESSAGE2 +'</p>',
      buttons: [this.translation.ALERT.BUTTONS]
    })
    information.present();
  }
  dismiss(){
    this.viewCtrl.dismiss();
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
