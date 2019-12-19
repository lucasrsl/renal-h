import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

/**
 * Generated class for the AddBloodGlucosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-blood-glucose',
  templateUrl: 'add-blood-glucose.html',
})
export class AddBloodGlucosePage {
  glucose_level: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public renderer: Renderer,  public translate: TranslateService, private platform: Platform) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement,'add-blood-glucose-popup',true);
    this.initFormBloodPressure()
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBloodGlucosePage');
    if(this.platform.is('ios')){
      this.adjustModalIos('add-blood-glucose-popup');
    };

    let input = document.querySelector('input[type="number"]');
    input.addEventListener('input',()=>{
      let inputText = this.glucose_level.value.blood_glucose;
      if(inputText > 999){
        inputText = inputText.slice(0,3);
        this.glucose_level.patchValue({
          blood_glucose: inputText
        });
      };

    });
  }
  initFormBloodPressure(){
    this.glucose_level = this.formBuilder.group({
        blood_glucose: ['',Validators.required],
        date_of_glucose: ['',Validators.required]
    });
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  addBloodPressure(){
    if(this.glucose_level.valid){
      this.viewCtrl.dismiss(this.glucose_level.value);
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
