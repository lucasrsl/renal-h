import { TranslateService } from '@ngx-translate/core';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-exam-select',
  templateUrl: 'exam-select.html',
})
export class ExamSelectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController, private platform: Platform, private translate: TranslateService) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement,'exam-select-popup',true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamSelectPage');
    if(this.platform.is('ios')){
      this.adjustModalIos('page-popup');
    };
  }
  dismiss(){
    this.viewCtrl.dismiss(null);
  }
  selectExamType(value){
    this.viewCtrl.dismiss(value);
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
