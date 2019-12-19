import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the AttendanceAnotherHospitalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-another-hospital',
  templateUrl: 'attendance-another-hospital.html',
})
export class AttendanceAnotherHospitalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer, private platform: Platform) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'page-popup',true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceAnotherHospitalPage');
    if(this.platform.is('ios')){
      this.adjustModalIos('page-popup');
    };
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
