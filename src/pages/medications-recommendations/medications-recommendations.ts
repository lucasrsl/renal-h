import { TranslateService } from '@ngx-translate/core';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Platform } from 'ionic-angular';

/**
 * Generated class for the MedicationsRecommendationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medications-recommendations',
  templateUrl: 'medications-recommendations.html',
})
export class MedicationsRecommendationsPage {
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController, public alertCtrl: AlertController, private platform: Platform, private translate: TranslateService) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'page-popup',true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("MEDICATIONS_RECOMMENDATIONS").subscribe((res)=>{
      this.translation = res
    });

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
  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicationsRecommendationsPage');
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
