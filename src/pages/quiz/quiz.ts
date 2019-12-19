import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { QuizService } from './quiz-service';
import { Device } from '@ionic-native/device';


/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  checkBoxYes: boolean[] = Array(11).fill(null);
  checkBoxNo: boolean[] = Array(11).fill(null);
  questions: string[] = [
    '1- Eu tenho entre 50 e 59 anos de idade',
    '2- Eu tenho entre 60 e 69 anos de idade',
    '3- Eu tenho 70 anos de idade ou mais',
    '4- Eu sou mulher',
    '5- Eu tive/tenho anemia',
    '6- Eu tenho pressão alta',
    '7- Eu sou diabético',
    '8- Eu tive um ataque cardíaco (infarto) ou derrame/AVC/AVE',
    '9- Eu tenho insuficiência cardíaca congestiva ou insuficiência cardíaca',
    '10- Eu tenho problema de circulação/doença circulatória em minhas pernas',
    '11- Meu exame mostrou que eu tenho perda de proteína na minha urina'
  ];
  quizForm: FormGroup;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController, private quizService: QuizService, private formBuilder: FormBuilder, private device: Device, private loadingCtrl: LoadingController, private translate: TranslateService) {
    this.initializeQuizForm();
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("QUESTION").subscribe((res)=>{
      this.translation = res;
      this.questions = res.QUIZ;
    });
  }
  initializeQuizForm(){
    this.quizForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      full_name: ['',Validators.required],
      mac_address: [this.device.uuid],
      quizcol: ['']
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }
  verifyBoxYes(number: any, setValue?: boolean){
    if(setValue) this.checkBoxYes[number] = !this.checkBoxYes[number];
    if(this.checkBoxYes[number] == this.checkBoxNo[number] && this.checkBoxYes[number] ==true){
      this.checkBoxNo[number] = !this.checkBoxNo[number];
    }

  }
  verifyBoxNo(number: any, setValue?: boolean){
    if(setValue) this.checkBoxNo[number] = !this.checkBoxNo[number];
    if(this.checkBoxNo[number] == this.checkBoxYes[number] && this.checkBoxNo[number] ==true){
      this.checkBoxYes[number] = !this.checkBoxYes[number];
    }
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  sendQuiz(){
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    updateLoader.present();
    let result = 0;
    //let yes = this.checkBoxYes;
    //let no = this.checkBoxNo;
    //if(this.validQuiz(yes,no)){

    if(this.quizForm.valid && this.validQuiz(this.checkBoxYes,this.checkBoxNo)){
      for(let i = 0; i < (this.checkBoxYes.length+this.checkBoxNo.length); i++){
        if(this.checkBoxYes[i]){
          if(i > 2){
            result += 1;
          }else if(i == 2){
            result += 4;
          }else if(i == 1){
            result += 3;
          }else{
            result += 2;
          }
        }
      }
        //}
        this.quizForm.value.quizcol = result;

        let obj = this.quizForm.value;
        console.log(obj);
        this.quizService.postQuizResult(obj,(result,err?)=>{
          if(result){
            updateLoader.dismiss();
            let message =  this.translation.ALERT.RESULT._1;
            if(result >= 4){
              message = this.translation.ALERT.RESULT._2;
            };
            let resultAlert = this.alertCtrl.create({
              message: message,
              cssClass: 'alert-class',
              buttons: [this.translation.ALERT.BUTTON]
            });
            resultAlert.onDidDismiss(()=>{
              this.navCtrl.pop();
            })
            resultAlert.present();
          }else{
            this.navCtrl.push('InternetErrorPage',{hideSideMenu: true});
            updateLoader.dismiss();
          }

        });
    }else{
      if(!this.quizForm.controls['email'].valid){
        // let emailInput = <HTMLElement> document.querySelector('#emailInput').firstElementChild;
        if(this.quizForm.controls['email'].hasError('required')){
          this.quizService.sendAlert(this.translation.ERRORS.OPTION1,"error");
        }else{
          this.quizService.sendAlert(this.translation.ERRORS.OPTION2,"error");
        }
        // emailInput.focus();
        // emailInput.blur();
      }else if(!this.quizForm.controls['full_name'].valid){
        // let nameInput = <HTMLElement> document.querySelector('#nameInput').firstElementChild;
        this.quizService.sendAlert(this.translation.ERRORS.OPTION3,"error");
        // nameInput.focus();
        // nameInput.blur();
      }else{
        this.quizService.sendAlert(this.translation.ERRORS.OPTION4,"error");
      }
      updateLoader.dismiss();
    }

  }
  testInput(id){
    let Input = <HTMLElement> document.querySelector('#'+ id).firstElementChild;
    Input.blur();
    Input.focus();

  }
  validQuiz(yes: boolean[], no: boolean[]): boolean{
    let trueQuantity = 0;
    for(let i = 0; i < (yes.length + no.length); i++){
      if(yes[i]){
        trueQuantity++;
      }else if(no[i]){
        trueQuantity++;
      }
    }
    if(trueQuantity == 11){
      return true;
    }else{
      return false;
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
