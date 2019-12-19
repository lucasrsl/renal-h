import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Platform } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

/**
 * Generated class for the AddTreatmentExamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-treatment-exam',
  templateUrl: 'add-treatment-exam.html',
})
export class AddTreatmentExamPage {
  exam: FormGroup;
  canChangeItemColor: boolean = false;
  canDisplayToast: boolean = true;
  examArrayValidator: boolean[] = [false,false,false];
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder, public renderer: Renderer, public toastCtrl: ToastController, public translate: TranslateService, private platform: Platform) {
    this.InitExamForm();
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'add-treatment-exam-popup', true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
    this.translate.get('ADD_TREATMENT_EXAM').subscribe((res)=>{
      this.translation = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTreatmentExamPage');
  }
  ngAfterViewInit(){
    if(this.platform.is('ios')){
      this.adjustModalIos('add-treatment-exam-popup');
    };
  }
  ionViewWillEnter(){
    this.canChangeItemColor = true;
  }
  InitExamForm(): void{
    this.exam = this.formBuilder.group({
      calcium: ['', [this.verifyCalcium.bind(this)]],
      potassium: ['', [this.verifyPotassium.bind(this)]],
      phosphorus: ['', [this.verifyPhosphorus.bind(this)]],
      date_of_exam: ['', [Validators.required]]

    });
  }
  verifyCalcium(control: FormControl): boolean{
    if((control.value == null || control.value == '')){
      this.examArrayValidator[0] = false;
      if(this.canChangeItemColor) document.getElementById('calcium-item').setAttribute('calcium-value','invalid');
      return false;
    }
    else{
      this.examArrayValidator[0] = true;
      if(this.canChangeItemColor) document.getElementById('calcium-item').setAttribute('calcium-value','normal');
      return true;
    }
  }
  verifyPotassium(control: FormControl): boolean{
    if((control.value == null || control.value == '')){
      this.examArrayValidator[1] = false;
      if(this.canChangeItemColor) document.getElementById('potassium-item').setAttribute('potassium-value','invalid');
      return false;
    }
    else{
      this.examArrayValidator[1] = true;
      if(this.canChangeItemColor) document.getElementById('potassium-item').setAttribute('potassium-value','normal');
      return true;
    }
  }
  verifyPhosphorus(control: FormControl): boolean{
    if((control.value == null || control.value == '')){
      this.examArrayValidator[2] = false;
      if(this.canChangeItemColor) document.getElementById('phosphorus-item').setAttribute('phosphorus-value','invalid');
      return false;
    }
    else{
      this.examArrayValidator[2] = true;
      if(this.canChangeItemColor) document.getElementById('phosphorus-item').setAttribute('phosphorus-value','normal');
      return true;
    }
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  maxValue(event: any){
    let newValue = event.target.value;
    if(newValue.length > 3){
      event.target.value = newValue.slice(0,-1);
    };
  }
  addTreatmentExam(){
    console.log(this.exam.valid);
    if(this.exam.get('date_of_exam').valid && (this.examArrayValidator[0] || this.examArrayValidator[1] || this.examArrayValidator[2])){
      this.viewCtrl.dismiss(this.exam);
    }
    else{
      if((!this.examArrayValidator[0] && !this.examArrayValidator[1] && !this.examArrayValidator[2])){
        this.examArrayValidator.forEach((element,index)=>{
          if(!element){
            switch (index) {
              case 0:
                document.getElementById('calcium-item').setAttribute('calcium-value','invalid');
                break;
              case 1:
                document.getElementById('potassium-item').setAttribute('potassium-value','invalid');
                break;
              case 2:
                document.getElementById('phosphorus-item').setAttribute('phosphorus-value','invalid');
                break;
              default:
                break;
            }
          }
        })
      }else{
        document.getElementById('calcium-item').setAttribute('calcium-value','normal');
        document.getElementById('potassium-item').setAttribute('potassium-value','normal');
        document.getElementById('phosphorus-item').setAttribute('phosphorus-value','normal');
      }
      this.validatorLine();

      if(this.canDisplayToast){
        this.canDisplayToast = false;
        let advice = this.toastCtrl.create({
          message: this.translation.MESSAGE,
          duration: 3000,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: "X",
          cssClass: 'toast-alert error'
        });
        advice.onDidDismiss(()=>{
          this.canDisplayToast = true;
        });
        advice.present();
      }
    };
  }
  validatorLine(){
    if(this.exam.get('date_of_exam').valid){
      document.getElementById('date-line').setAttribute('date-value','normal');
    }
    else{
      document.getElementById('date-line').setAttribute('date-value','invalid');
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
