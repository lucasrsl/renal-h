import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Events } from 'ionic-angular';
import { ProfileService } from './profile.service';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  estado: string;
  cidade: string;
  listCitys:string[] = [];
  listStates: any[] = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"
  ];
  selectCitys = {
    title: 'Escolha a cidade',
    cssClass: 'select-class'
  };
  selectState = {
    title: 'Escolha o estado',
    cssClass: 'select-class'
  };
  clinic: string;
  user: any;
  updateForm: FormGroup;
  full_name: string;
  passwordValid: boolean = false;
  citySelect: boolean = false;
  email: string;
  actualTreatment: string;
  userType: number;
  language:any=1;
  canUpdateUser: boolean = true;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public profileService:ProfileService, public storage: Storage, public FormBuilder: FormBuilder,
  public loadingControl: LoadingController, public modalCtrl: ModalController, public events: Events,
  public alertController:AlertController, private translate: TranslateService){
    this.initUpdateForm();
    if(localStorage.getItem("language")){
      this.setLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("PROFILE").subscribe((res)=>{
      this.translation = res;
      this.selectState.title = res.SELECT_TITLE1;
      this.selectCitys.title = res.SELECT_TITLE2;
    });
    this.storage.get('usr').then((usr)=>{
      this.user = usr;
      this.changeCities(usr.clinic_state);
      this.full_name = this.user.full_name;
      this.email = usr.email;
      console.log(this.user);
      this.userType = usr.user_type;
      this.clinic = usr.clinic_name;
      this.estado = usr.clinic_state;
      this.cidade = usr.clinic_city;
      this.updateForm.setValue({
        full_name: usr.full_name,
        clinic_name: usr.clinic_name,
        clinic_city: usr.clinic_city,
        clinic_state: usr.clinic_state
      })
      this.verifyActualTreatment();

    },(err)=>{
      console.log(err);
    });

    if(localStorage.getItem("language")){
      this.language = parseInt(localStorage.getItem("language"));
    }

  }
  ionViewDidLoad(){
    this.events.publish('verifyPage',true);
    console.log(this.verifyMargin());
    document.getElementById('button-grid').style.marginTop = this.verifyMargin() + 'px';
  }
  ionViewWillUnload(){
    this.events.publish('verifyPage',false);
  }
  initUpdateForm(){
    this.updateForm = this.FormBuilder.group({
      full_name: [''],
      clinic_city: [''],
      clinic_name: [''],
      clinic_state: [''],
    });
  }
  changeCities(states: string){
    const updateLoader = this.loadingControl.create({
      content: this.translation.LOADING_MESSAGE
    });
    console.log(states);
    let state = {
      nome: states
    }
     updateLoader.present();
     this.profileService.getCitys(state,(cidades)=>{
       if(cidades){

         this.listCitys = cidades;

         updateLoader.dismiss();
       }else{
        this.listCitys = [];
        updateLoader.dismiss();
        this.navCtrl.push('InternetErrorPage');
      };
     });
  }
  changeState(states: string){
    this.canUpdateUser = false;
    this.changeCities(states);
  }
  updateUser(){
    const updateLoader = this.loadingControl.create({
      content: this.translation.LOADING_MESSAGE
    });
    updateLoader.present();
    this.updateForm.value.full_name = this.full_name;
    delete this.updateForm.value.passwordConf;
    let user = {
      user: this.updateForm.value
    }
    console.log(user);
    this.profileService.putUser(user,(result,err?)=>{
      if(result){
        this.profileService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS, "success");
        if(result.user_type == 1){
          this.navCtrl.setRoot('HowAreYouTodayPage');
        }
        else if(result.user_type == 2 || result.user_type == 3){
          this.navCtrl.setRoot('TodaySchedulePage');
        }

      }else if(err.status == 0){
        this.profileService.sendAlert(this.translation.TOAST_MESSAGE_ERROR, "error");
        this.navCtrl.push('InternetErrorPage');
      }else if(err.status == 401){
        this.navCtrl.setRoot("LoginPage");
      }
      updateLoader.dismiss();
    });
  }
  endTreatment(){
    this.navCtrl.push('EndTreatmentPage');
  }
  changePassword(){
    let changePasswordModal = this.modalCtrl.create('ChangePasswordPage',null,{enableBackdropDismiss: true, showBackdrop: true});
    changePasswordModal.present();
  }
  verifyActualTreatment(){
    if(this.userType == 1){
      this.actualTreatment = this.translation.TREATMENT.TYPE1;
    }
    else if(this.userType == 2){
      this.actualTreatment = this.translation.TREATMENT.TYPE2;
    }
    else if(this.userType == 3){
      this.actualTreatment = this.translation.TREATMENT.TYPE3;
    }
  }
  verifyMargin(){
    let margin = (document.documentElement.clientHeight - document.getElementById('header-class').clientHeight
    - document.getElementById('grid-visual').clientHeight - document.getElementById('button-grid').clientHeight - 100);
    return  margin;
  }
  changeLanguage(){
    let flags = [false,false,false];
    if(this.language==1){
      flags[0]=true;flags[1]=false;flags[2]=false;
    }else if(this.language==2){
      flags[0]=false;flags[1]=true;flags[2]=false;
    }else if(this.language==3){
      flags[0]=false;flags[1]=false;flags[2]=true;
    }
      let prompt = this.alertController.create({
      cssClass: 'alert-class',
      title: this.translation.ALERT.TITLE,
      // message: 'Select option ',
      inputs: [
        {
            type:'radio',
            label:'pt/BR',
            value:'1',
            checked: flags[0]
        },
        {
            type:'radio',
            label:'en/US',
            value:'2',
            checked: flags[1]
        },
        {
            type:'radio',
            label:'es/ES',
            value:'3',
            checked: flags[2]
        }
      ],
      buttons : [
      {
          text: this.translation.ALERT.BUTTONS._1,
          handler: data => {
          console.log("cancel clicked");
          }
      },
      {
          text: this.translation.ALERT.BUTTONS._2,
          handler: (data:string) => {
            console.log(data);
            localStorage.setItem("language",data);
            this.language = data;
            this.events.publish('changeLanguage', this.language);
            if(localStorage.getItem("language")){
              this.setLanguage(parseInt(localStorage.getItem("language")));
            };
            this.storage.get('usr').then((usr)=>{
              this.userType = usr.user_type;
              if(this.userType == 1){
                this.navCtrl.setRoot('HowAreYouTodayPage');
              }
              else if(this.userType == 2 || this.userType == 3){
                this.navCtrl.setRoot('TodaySchedulePage');
              }
            })
          }
      }]});
      prompt.present();
  }
  setLanguage(lang){
    if(lang==1){
      this.translate.use('pt');
    }else if(lang==2){
      this.translate.use('en');
    }else if(lang==3){
      this.translate.use('es');
    }
  }
}
