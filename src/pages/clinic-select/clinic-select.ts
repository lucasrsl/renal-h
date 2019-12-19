import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClinicSelectService } from './clinic-select.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the ClinicSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clinic-select',
  templateUrl: 'clinic-select.html',
})
export class ClinicSelectPage {
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
    cssClass: "alert-class"
  };
  selectState = {
    title: 'Escolha o estado',
    cssClass: "alert-class"
  };
  clinic: string;
  user: any;
  updateForm: FormGroup;
  citySelect: boolean = false;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public clinicSelectService: ClinicSelectService, public storage: Storage, public FormBuilder: FormBuilder,
  public loadingControl: LoadingController,public translate: TranslateService){

    this.user = this.navParams.get('user');
    this.initUpdateForm();
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
    this.translate.get('CLINIC_SELECT.SELECT_1').subscribe((res)=>{
      this.selectCitys.title = res
    });
    this.translate.get('CLINIC_SELECT.SELECT_2').subscribe((res)=>{
      this.selectState.title = res
    });
    this.translate.get("CLINIC_SELECT").subscribe((res)=>{
      this.translation = res;
    });
  }
  initUpdateForm(){
    this.updateForm = this.FormBuilder.group({
      full_name: [''],
      password: [''],
      email: [''],
      birth_date: [''],
      clinic_city: ['',[Validators.required]],
      clinic_name: ['',[Validators.required]],
      clinic_state: ['',[Validators.required]]
    });
  }
  changeCities(states: string){
    let loadingMessage
    this.translate.get('CLINIC_SELECT.MESSAGE.LOADING_1').subscribe((res)=>{
      loadingMessage = res
    });
    const updateLoader = this.loadingControl.create({
      content: loadingMessage
    });
    updateLoader.present();
    console.log(states);
    let state = {
      nome: states
    }
    this.clinicSelectService.getCitys(state,(cidades)=>{
      if(cidades){
        this.listCitys = cidades;
        updateLoader.dismiss();
      }
      else{
        console.log('error');
        this.navCtrl.push('InternetErrorPage',{hideSideMenu: true});
        updateLoader.dismiss();
      }
    });
  }
  postUser(){
    let loadingMessage
    this.translate.get('CLINIC_SELECT.MESSAGE.LOADING_2').subscribe((res)=>{
      loadingMessage = res
    });
    const updateLoader = this.loadingControl.create({
      content: loadingMessage
    });
    updateLoader.present();
    this.updateForm.value.full_name = this.user.full_name;
    this.updateForm.value.password = this.user.password;
    this.updateForm.value.email = this.user.email;
    this.updateForm.value.birth_date = this.user.birth_date;
    let user = {
      user: this.updateForm.value
    }
    console.log(user);
    /*this.clinicSelectService.postUser(user,(result)=>{
      if(result){

        console.log(result);
        this.navCtrl.setRoot('LoginPage');
        updateLoader.dismiss();
      }else{
        console.log('error');
        this.navCtrl.push('InternetErrorPage');
        updateLoader.dismiss();
      }
    });*/
    this.storage.get('term').then((value)=>{
      if(value){
        this.clinicSelectService.postUser(user,(result,err?)=>{
          if(result){
            this.clinicSelectService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");

            console.log(result);
            this.navCtrl.setRoot('LoginPage');
            updateLoader.dismiss();
          }else{

            if(err.status == 422){
              this.navCtrl.popToRoot();
              this.clinicSelectService.sendAlert(this.translation.TOAST_MESSAGE_ERROR, "error");
              updateLoader.dismiss();
            }else{
              this.navCtrl.push('InternetErrorPage');
              updateLoader.dismiss();
            }
          }
        });
      }else{
        updateLoader.dismiss();
        this.navCtrl.push('ServiceTermPage',{type: 2,httpRequest: this.clinicSelectService.postUser, user: user, loadingCtrl: this.loadingControl})
      };
    })

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
