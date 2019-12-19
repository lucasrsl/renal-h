import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

/**
 * Generated class for the AlarmIntervalSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alarm-interval-select',
  templateUrl: 'alarm-interval-select.html',
})
export class AlarmIntervalSelectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController,  public translate: TranslateService) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'alarm-interval-select-popup', true)
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmIntervalSelectPage');
  }
  dismiss(){
    this.navCtrl.pop();
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
