import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
/**
 * Generated class for the AddBloodPressurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-blood-pressure',
  templateUrl: 'add-blood-pressure.html',
})
export class AddBloodPressurePage {
  blood_pressure_level: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public renderer: Renderer, public translate: TranslateService, private platform: Platform) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement,'add-blood-pressure-popup',true);
    this.initFormBloodPressure()
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBloodPressurePage');
    if(this.platform.is('ios')){
      this.adjustModalIos('add-blood-pressure-popup');
    };
    /*document.querySelectorAll('input[type="number"]').forEach((element)=>{
      let input = <HTMLElement> element;
      input.addEventListener('input',(e)=>{
        let inputText = e.target.value;
        if(inputText > 999){
          e.target.value = inputText.slice(0,3);
        };

      });
    });*/
    let input = document.querySelectorAll('input[type="number"]')[0];
    input.addEventListener('input',()=>{
      let inputText = this.blood_pressure_level.value.measure_pressure;
      if(inputText > 999){
        inputText = inputText.slice(0,3);
        this.blood_pressure_level.patchValue({
          measure_pressure: inputText
        });
      };
    });
    input = document.querySelectorAll('input[type="number"]')[1];
    input.addEventListener('input',()=>{
      let inputText = this.blood_pressure_level.value.measure_pressure2;
      if(inputText > 999){
        inputText = inputText.slice(0,3);
        this.blood_pressure_level.patchValue({
          measure_pressure2: inputText
        });
      };

    });


  }
  initFormBloodPressure(){
    this.blood_pressure_level = this.formBuilder.group({
        measure_pressure: ['',Validators.required],
        measure_pressure2: ['',Validators.required],
        date_of_pressure: ['',Validators.required]
    })
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  addBloodPressure(){
    if(this.blood_pressure_level.valid){
      this.blood_pressure_level.value.measure_pressure = this.blood_pressure_level.value.measure_pressure + '/' + this.blood_pressure_level.value.measure_pressure2;
      delete this.blood_pressure_level.value.measure_pressure2;
      this.viewCtrl.dismiss(this.blood_pressure_level.value);
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
