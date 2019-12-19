import { TranslateService } from '@ngx-translate/core';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the GlomerularFilterRatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-glomerular-filter-rate',
  templateUrl: 'glomerular-filter-rate.html',
})
export class GlomerularFilterRatePage {
  checkBoxH: boolean = false;
  checkBoxM: boolean = false;
  checkBoxSim: boolean = false;
  checkBoxNao: boolean = false;
  creatinina: number;
  idade: number;
  GFR: number = 0;
  GFRCalculated: boolean = false;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController, public renderer: Renderer, private platform: Platform, private translate: TranslateService) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement,'page-popup',true);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get('GLOMERULAR_FILTER_RATE').subscribe((res)=>{
      this.translation = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlomerularFilterRatePage');
    if(this.platform.is('ios')){
      this.adjustModalIos('page-popup');
    };

  }
  checkSexoH(){
    if(this.checkBoxH == this.checkBoxM && this.checkBoxH == true){
      this.checkBoxH = !this.checkBoxH;
    }
  }
  checkSexoM(){
    if(this.checkBoxH == this.checkBoxM && this.checkBoxH == true){
      this.checkBoxM = !this.checkBoxM;
    }
  }
  verifyCheckBoxSim(){
    if(this.checkBoxSim == this.checkBoxNao && this.checkBoxSim == true){
      this.checkBoxSim = !this.checkBoxSim;
    }
  }
  verifyCheckBoxNao(){
    if(this.checkBoxSim == this.checkBoxNao && this.checkBoxSim == true){
      this.checkBoxNao = !this.checkBoxNao;
    }
  }
  validInfo(){
    if(this.checkBoxH == this.checkBoxM){
      return false;
    }
    if(this.checkBoxSim == this.checkBoxNao){
      return false;
    }
    if(this.idade == undefined  || this.idade == 0 || this.idade == null){
      return false;
    }
    if(this.creatinina ==  undefined || this.creatinina == 0 || this.creatinina == null){
      return false;
    }
    return true;

  }
  maxValue(event: any){
    let newValue = event.target.value;
    if(newValue.length > 3){
      event.target.value = newValue.slice(0,-1);
    };
  }

  formataNumero(number: any, separator: string = '.', decimals: number = 2) {
    let digits:any = number.value.split('');
    let numberString:string = '';
    digits.forEach((char:any) => {
      if (!isNaN(char)) numberString = numberString + char;
    });
    numberString = parseInt(numberString).toString();
    if (numberString.length < (decimals+1)) {
      numberString = ('0'.repeat(decimals+1) + numberString);
      numberString = numberString.slice((decimals+1)*-1);
    }
    let answer = numberString.split('');
    let result = '';
    for (let i=0; i < answer.length; i++) if (i == answer.length - decimals) result = result + separator + answer[i]; else result = result + answer[i];
    number.value = result;
  }

  check(cre: any, k: any, a: any){
    var div;
    div = cre/k;
    if(cre <= 0.7 && this.checkBoxM == true){
      return (div**a);
    }
    else if(cre <= 0.9 && this.checkBoxH == true){
      return (div**a);
    }
    else{
      return (div**-1.209);
    }
  }
  calcResult(){
    console.log(this.validInfo());
    const errorToValidate = this.toastCtrl.create({
        message: this.translation.ALERT.MESSAGE,
        duration: 3000
    });
    if(this.validInfo() == true){
      var k;
      var a;
      if(this.checkBoxH == true){
        k=0.9;
        a=-0.411;
      }
      else{
        k=0.7;
        a=-0.329;
      }
      this.GFR = 141*this.check(this.creatinina,k,a)*(0.993**this.idade);
      // debugger
      if(this.checkBoxM == true){
        this.GFR = this.GFR *1.018;
      }
      if(this.checkBoxSim == true){
        this.GFR = this.GFR * 1.159;
      }
      console.log(this.GFR);
      this.GFRCalculated = true;

    }
    else{
      this.GFRCalculated = false;
      errorToValidate.present();
    }
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


