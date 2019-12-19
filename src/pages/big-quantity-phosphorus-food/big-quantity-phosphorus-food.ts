import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Platform } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
/**
 * Generated class for the BigQuantityPhosphorusFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-big-quantity-phosphorus-food',
  templateUrl: 'big-quantity-phosphorus-food.html',
})
export class BigQuantityPhosphorusFoodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public renderer:Renderer, public viewCtrl:ViewController, public translate: TranslateService, private platform: Platform) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'page-popup',true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BigQuantityPhosphorusFoodPage');
    if(this.platform.is('ios')){
      this.adjustModalIos('page-popup');
    };
  }
  openInformation(){
    let message;
    let title;
    let button;
    this.translate.get('BIG_QUANTITY_PHOSPHORUS_FOOD.ALERT').subscribe((res)=>{
      message = res.MESSAGE
      title = res.TITLE
      button = res.BUTTON
    });
    let information = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [button]
    })
    information.present();
  }
  dismiss(){
    this.viewCtrl.dismiss();
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
}
