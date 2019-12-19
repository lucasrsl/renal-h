import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

/**
 * Generated class for the AddTransplantedWeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-transplanted-weight',
  templateUrl: 'add-transplanted-weight.html',
})
export class AddTransplantedWeightPage {
  transplanted_weight: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public renderer: Renderer, public translate: TranslateService, private platform: Platform) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement,'add-transplanted-weight-popup',true);
    this.initFormBloodPressure();
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTransplantedWeight');
    if(this.platform.is('ios')){
      this.adjustModalIos('add-transplanted-weight-popup');
    };
    /*let input = document.querySelector('input[type="number"]');
    input.addEventListener('input',(e)=>{
      let inputText = e.target.value;
      if(inputText > 999){
        e.target.value = inputText.slice(0,3);
      };

    });*/
    /*let input = document.querySelector('input[type="number"]');
    input.addEventListener('input',()=>{
      let inputText = this.transplanted_weight.value.weight;
      if(inputText > 999){
        inputText = inputText.slice(0,3);
        this.transplanted_weight.patchValue({
          weight: inputText
        });
      };

    });*/
  }
  initFormBloodPressure(){
    this.transplanted_weight = this.formBuilder.group({
        weight: ['',Validators.required],
        date_of_weight: ['',Validators.required]
    })
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  addBloodPressure(){
    if(this.transplanted_weight.valid){
      this.viewCtrl.dismiss(this.transplanted_weight.value);
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
