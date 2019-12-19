import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the FrequencySelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-frequency-select',
  templateUrl: 'frequency-select.html',
})
export class FrequencySelectPage {
  frequencyType: string[] = ['4 em 4 horas', '6 em 6 horas', '8 em 8 horas','12 em 12 horas', '1x ao dia'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer, private translate: TranslateService) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement,'frequency-select-popup', true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrequencySelectPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  selectFrequency(selectedType: string){
    this.viewCtrl.dismiss(selectedType);
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
