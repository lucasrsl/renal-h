import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AboutKidneyTransplantationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-kidney-transplantation',
  templateUrl: 'about-kidney-transplantation.html',
})
export class AboutKidneyTransplantationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private renderer: Renderer, private viewCtrl: ViewController, private alertCtrl: AlertController, private platform: Platform, public translate: TranslateService) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'page-popup',true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutKidneyTransplantationPage');
    if(this.platform.is('ios')){
      this.adjustModalIos('page-popup');
    };
  }
  openInformation(){
    let title;
    let message;
    let button;
    this.translate.get('ABOUT_KIDNEY_TRANSPLANTATION.ALERT.TITLE').subscribe((res)=>{
      title = res
    });
    this.translate.get('ABOUT_KIDNEY_TRANSPLANTATION.ALERT.MESSAGE').subscribe((res)=>{
      message = res
    });
    this.translate.get('ABOUT_KIDNEY_TRANSPLANTATION.ALERT.BUTTON').subscribe((res)=>{
      button = res
    });
    let information = this.alertCtrl.create({
      title: title,
      cssClass: 'alert-class',
      message: `<p>${message}</p>`,
      buttons: [button]
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

}
