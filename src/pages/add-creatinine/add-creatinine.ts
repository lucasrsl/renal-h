import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

/**
 * Generated class for the AddCreatininePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-creatinine',
  templateUrl: 'add-creatinine.html',
})
export class AddCreatininePage {
  creatinine_level: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController, public renderer: Renderer, public translate: TranslateService, public platform: Platform) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'add-creatinine-popup',true);
    this.initFormCreatinine();
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCreatininePage');
    if(this.platform.is('ios')){
      this.adjustModalIos('add-creatinine-popup');
    };


    /*let input = document.querySelector('input[type="number"]');
    input.addEventListener('input',(e)=>{
      let inputText = e.target.value;
      if(inputText > 999){
        e.target.value = inputText.slice(0,3);
      };

    });*/
    let input = document.querySelector('input[type="number"]');
    input.addEventListener('input',()=>{
      let inputText = this.creatinine_level.value.creatinine;
      if(inputText > 999){
        inputText = inputText.slice(0,3);
        this.creatinine_level.patchValue({
          creatinine: inputText
        });
      };

    });
  }
  initFormCreatinine(){
    this.creatinine_level = this.formBuilder.group({
        creatinine: ['',Validators.required],
        date_of_creatinine: ['',Validators.required]
    })
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  addCreatinine(){
    if(this.creatinine_level.valid){
      let temp = {
        "creatinine_level": this.creatinine_level.value
      };
      this.viewCtrl.dismiss(temp);
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

  formataNumero(number: any, separator: string = '.', decimals: number = 2) {
    let digits:any = number.value.split('');
    let numberString:string = '';
    digits.forEach((c:any) => { if (!isNaN(c)) numberString = numberString + c; });
    numberString = parseInt(numberString).toString();
    if (numberString.length < (decimals+1)) { numberString = ('0'.repeat(decimals+1) + numberString); numberString = numberString.slice((decimals+1)*-1); }
    let answer = numberString.split('');
    let result = '';
    for (let i=0; i < answer.length; i++) if (i == answer.length - decimals) result = result + separator + answer[i]; else result = result + answer[i];
    number.value = result;
  }
}

