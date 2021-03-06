import { TranslateService } from '@ngx-translate/core';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the LowMediumAmountsPotassiumFoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-low-medium-amounts-potassium-foods',
  templateUrl: 'low-medium-amounts-potassium-foods.html',
})
export class LowMediumAmountsPotassiumFoodsPage {
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController, public renderer: Renderer, private platform: Platform, private translate: TranslateService) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'page-popup',true);
    this.translate.get("LOW_MEDIUM_AMOUNTS_POTASSIUM_FOODS").subscribe((res)=>{
      this.translation = res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LowMediumAmountsPotassiumFoodsPage');
    if(this.platform.is('ios')){
      this.adjustModalIos('page-popup');
    };
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }
  openInformation(){
    let information = this.alertCtrl.create({
      title: this.translation.ALERT.TITLE,
      cssClass: 'alert-class',
      message: this.translation.ALERT.MESSAGE,
      buttons: [this.translation.ALERT.BUTTON]
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
