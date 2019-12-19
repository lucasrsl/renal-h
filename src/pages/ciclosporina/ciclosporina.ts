import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CiclosporinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ciclosporina',
  templateUrl: 'ciclosporina.html',
})
export class CiclosporinaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer, public alertCtrl: AlertController, private platform: Platform, public translate: TranslateService) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'page-popup',true);
  }
  openInformation(){
    let message;
    let button;
    this.translate.get('CICLOSPORINA.ALERT').subscribe((res)=>{
      message = res.MESSAGE
      button = res.BUTTON
    });
    let information = this.alertCtrl.create({
      cssClass: 'alert-class',
      message: message,
      buttons: [button]
    })
    information.present();
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CiclosporinaPage');
    if(this.platform.is('ios')){
      this.adjustModalIos('page-popup');
    };
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
