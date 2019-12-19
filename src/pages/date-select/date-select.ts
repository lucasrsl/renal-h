import { TranslateService } from '@ngx-translate/core';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DateSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date-select',
  templateUrl: 'date-select.html',
})
export class DateSelectPage {
  date: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer, private translate: TranslateService) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'date-select-popup', true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateSelectPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  changeYear(){
    this.viewCtrl.dismiss(this.date);
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
