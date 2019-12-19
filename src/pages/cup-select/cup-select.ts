
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CupSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cup-select',
  templateUrl: 'cup-select.html',
})
export class CupSelectPage {
  volume: number;
  myParam: string;
  selectedOption: boolean[] = [false,false,false,false];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public renderer: Renderer, public translate: TranslateService) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'cup-select-popup', true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CupSelectPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  sendValue(){
    this.viewCtrl.dismiss(this.volume);
  }
  changeCupVolume(volume: number){
    this.volume = volume;
    let optionSelected;
    if(volume == 200){
      this.selectedOption[0] = true;
      optionSelected = 0;
    }
    if(volume == 150){
      this.selectedOption[1] = true;
      optionSelected = 1;
    }
    if(volume == 100){
      this.selectedOption[2] = true;
      optionSelected = 2;
    }
    if(volume == 50){
      this.selectedOption[3] = true;
      optionSelected = 3;
    }
    for(let i = 4; i != optionSelected; i--){
      if(this.selectedOption[i] == true){
        this.selectedOption[i] = false;
      }
    }
    for(let i = 0; i != optionSelected; i++){
      if(this.selectedOption[i] == true){
        this.selectedOption[i] = false;
      }
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
