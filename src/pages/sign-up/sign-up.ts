import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import {SignUpService} from './sign-up.service';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user: FormGroup;
  cont: number = 0;
  type: string = 'password';
  showPassword:   boolean = false;
  invalidEmail:   boolean = false;
  invalidConfEmail: boolean = false;
  translation: any;
  loadPage: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, public toastCtrl: ToastController,public signUpService:SignUpService, private translate: TranslateService) {
       this.InitUserForm();
       if(localStorage.getItem("language")){
        this.changeLanguage(parseInt(localStorage.getItem("language")));
      };
       this.translate.get("SIGN_UP").subscribe((res)=>{
        this.translation = res;
      });
    }
    ionViewDidLoad(){
      this.loadPage = true;
    }

    getEmail(): string {
    return this.user.value['email'];
    }
    getEmailConf(): string {
    return this.user.value['emailValConf'];
    }
    getPasswordConf(): string {
    return this.user.value['passwordConf'];
    }
    getPassword(): string {
    return this.user.value['password'];
    }
    getMyDate(): string {
    return this.user.value['birth_date'];
    }
    getName(): string {
      return this.user.value['full_name'];
    }
    getSecondName(): string {
      return this.user.value['secondName'];
    }
    checkPassowordLength(){
      if(this.getPassword().length >= 8){
        return true;
      }
      else{
        return false;
      }
    }

    InitUserForm(): void{
      this.user = this.formBuilder.group({
        full_name: ['', [Validators.required]],
        secondName: ['', [Validators.required]],
        email: ['', [Validators.email ,Validators.required, this.emailValidator.bind(this)]],
        emailValConf: ['', [Validators.required, this.confEmailValidator.bind(this)]],
        password: ['', [Validators.required,Validators.minLength(8)]],
        passwordConf: ['', [Validators.required,Validators.minLength(8)]],
        birth_date: ['', [Validators.required]],

    }, {validator: this.confirmValidation})
  }
  confirmValidation(group: FormGroup){
    if(group.controls['email'].dirty && group.controls['emailValConf'].dirty){
      let lastFocus = <HTMLElement> document.activeElement;
      let email = <HTMLElement> document.getElementById('emailValConf').firstElementChild;
      if(group.value['email'] !== group.value['emailValConf']){

        group.controls['emailValConf'].setErrors({'invalid': true});
        email.focus();
        lastFocus.focus();

      }else{
        group.controls['emailValConf'].setErrors(null);
        if (!group.controls['emailValConf'].value.match("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")) {
          group.controls['emailValConf'].setErrors({"invalidEmail": true});
        }
        email.focus();
        lastFocus.focus();
      }
    }
    if(group.controls['password'].dirty && group.controls['passwordConf'].dirty){
      let lastFocus = <HTMLElement> document.activeElement;
      let password = <HTMLElement> document.getElementById('passwordConf').firstElementChild;
      if(group.value['password'] !== group.value['passwordConf']){

        group.controls['passwordConf'].setErrors({'invalid': true});
        password.focus();
        lastFocus.focus();

      }else{
        group.controls['passwordConf'].setErrors(null);
        if(group.controls['password'].hasError('minlength')){
          group.controls['passwordConf'].setErrors({'invalidLength': true});
        }
        password.focus();
        lastFocus.focus();
      }
    }

  }
  dateTimeValidationBorder(){
    if(this.user.controls["birth_date"].valid){
      // let j: String[] = this.user.value['birth_date'].split("-", 3);
      // if(j[0] <= 2001) {
        document.getElementById('dateTimeItem').setAttribute("value", "normal");
      } else{
       document.getElementById('dateTimeItem').setAttribute("value", "invalid");      
      }
    // }
  }
  emailValidator(control: FormControl){
    if (!control.value.match("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")) {
      this.invalidEmail = true;
      if(this.loadPage){
        document.getElementById('emailItem').setAttribute("value", "invalid");
      }
    } else{
      if(this.loadPage){
        document.getElementById('emailItem').setAttribute("value", "normal");
      }
      
      this.invalidEmail = false;
    }
  }
  confEmailValidator(control: FormControl){
    if (!control.value.match("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")) {
      this.invalidConfEmail = true;
      if(this.loadPage){
        document.getElementById('emailConfItem').setAttribute("value", "invalid");
      }
    }else{
      if(this.loadPage){
        document.getElementById('emailConfItem').setAttribute("value", "normal");
      }
      this.invalidConfEmail = false;
    }
  }
  buttonShowPassword(): void {
    this.showPassword = !this.showPassword;
    if(this.showPassword == true){
      this.type = 'text';
    }
    else{
      this.type = 'password';
    }
  }
  foward(): void {
    !this.user.valid ? this.signUpService.sendAlert(this.translation.TOAST_MESSAGE, "error") : this.postUser();
  }
  postUser(){
    this.user.value.full_name = this.user.value.full_name+" "+this.user.value.secondName;
    delete this.user.value.passwordConf;
    delete this.user.value.secondName;
    delete this.user.value.emailValConf;
    let user = {
      user:this.user.value
    }
    console.log(user);
    this.navCtrl.push('ClinicSelectPage', user);
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
