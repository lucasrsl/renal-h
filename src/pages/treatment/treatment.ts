import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { TreatmentService } from './treatment-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TreatmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-treatment',
  templateUrl: 'treatment.html',
})
export class TreatmentPage {
  lastCupTime: string;
  hemodialysisTreatmentID: number;
  lastCup: number;
  lastExam: string;
  liquidController: string = 'Nenhum copo adicionado hoje.';
  exams: string = 'Nenhum exame disponível.';
  lastWeight: string = 'Nenhum peso calculado hoje.';
  translation: any;
  treatment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, public treatmentService: TreatmentService, public storage: Storage, public loadingCtrl: LoadingController, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("TREATMENT").subscribe((res)=>{
      this.translation = res;
      this.liquidController = res.MESSAGE_PLACEHOLDER.LIQUID_CONTROLLER.DEFAULT;
      this.exams = res.MESSAGE_PLACEHOLDER.EXAM.DEFAULT;
      this.lastWeight = res.MESSAGE_PLACEHOLDER.WEIGHT.DEFAULT;
    });
    console.log(this.storage);

  }
  ionViewWillEnter(){
    this.storage.get('usr').then((usr)=>{
      let treatment;
      if(usr.user_type == 1){
        treatment = 'hemodialysis_treatments';
      }else{
        treatment = 'conservative_treatments';
      }
      this.treatment = treatment;
      this.treatmentService.setTreatment(treatment);
    });
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    updateLoader.present()
    this.storage.get('usr').then((usr)=>{
      this.treatmentService.getHemodialysisTreatment(usr,(result,err?)=>{
        console.log(result);
        if(result){
          if(this.treatment == "hemodialysis_treatments"){
            let hemodialysisTreatment = result.hemodialysis_treatments.pop();
            this.hemodialysisTreatmentID = hemodialysisTreatment.id;
            this.getLastCup();
            this.getLastExam();
            this.getLastWeight();
          }else{
            let objKey = Object.keys(result)[0];
            this.hemodialysisTreatmentID = result[objKey];
            this.getLastExam();
          }

          updateLoader.dismiss();
        }
        else{
          if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
            updateLoader.dismiss();
          }else{
            this.navCtrl.push('InternetErrorPage');
            updateLoader.dismiss();
          }
        };

      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TreatmentPage');
  }
  openPage(page) {
    this.navCtrl.push(page);
  }
  addCupShortcut(){
      let cupSelect = this.modalCtrl.create('CupSelectPage',null,{showBackdrop: true,enableBackdropDismiss: true,cssClass: 'inset-modal cup-select-id'});
      cupSelect.onDidDismiss(data =>{
        let updateLoader = this.loadingCtrl.create({
          content: this.translation.LOADING_MESSAGE
        });
        console.log(data);
        if(data != null){
          updateLoader.present();
          let drink_amount ={
            amount: data
          };
          console.log(drink_amount);
          this.treatmentService.postDrinkAmount(drink_amount,this.hemodialysisTreatmentID,(result,err?)=>{
            if(result){
              this.treatmentService.sendAlert(this.translation.TOAST_MESSAGE_ADD_CUP,"success");
              this.getLastCup();
            }else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
                updateLoader.dismiss();
              }else{
                this.navCtrl.push('InternetErrorPage');
                updateLoader.dismiss();
              }
            };

          })
          updateLoader.dismiss();
        }
      });
      cupSelect.present();
  }
  addExamShortcut(){
    let addTreatmentExam = this.modalCtrl.create('AddTreatmentExamPage',null, {cssClass: 'inset-modal'});
    addTreatmentExam.onDidDismiss(data =>{
      let updateLoader = this.loadingCtrl.create({
        content: this.translation.LOADING_MESSAGE
      });
      if(data != null){
        updateLoader.present();
        let exam_registry;
        if(this.treatment == "conservative_treatments"){
          exam_registry = {
            "exam_registry_conservatives":data.value
          }
        }else{
          exam_registry = {
            "exam_registry":data.value
          }
        }

        console.log(exam_registry);
        this.treatmentService.postExamRegistry(exam_registry,this.hemodialysisTreatmentID,(result,err?)=>{
          if(result){
            this.treatmentService.sendAlert(this.translation.TOAST_MESSAGE_ADD_EXAM,"success");
            this.getLastExam();
          }else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
              updateLoader.dismiss();
            }else{
              this.navCtrl.push('InternetErrorPage');
              updateLoader.dismiss();
            }
          };
        })
        updateLoader.dismiss();
      }
    });
    addTreatmentExam.present();
  }
  getLastCup(){
    this.treatmentService.getDrinkAmout(this.hemodialysisTreatmentID,(result,err?)=>{
      if(result){
        if(result.drink_amounts.length != 0){
          let lastDrinkAmount = result.drink_amounts.pop();
          this.lastCup = lastDrinkAmount.amount;
          this.lastCupTime = this.adjustTime(lastDrinkAmount);
          this.liquidController = (this.translation.MESSAGE_PLACEHOLDER.LIQUID_CONTROLLER.TEXT1 +" "+ this.lastCupTime+ ': ' + this.lastCup + 'ml.');
        }
      }else{
        if(err.status == 401){
          this.navCtrl.setRoot("LoginPage");
        }else{
          this.navCtrl.push('InternetErrorPage');
        }
      };
    });
  }
  adjustTime(list){
    let date = new Date(list.created_at);
    let time;
    if(date.getHours() < 10){
      if(date.getMinutes() < 10){
        time = '0' + date.getHours()+':0' + date.getMinutes();
      }
      else{
        time = '0' + date.getHours()+':' + date.getMinutes();
      }
    }
    else if(date.getMinutes()<10){
      time = date.getHours()+':0' + date.getMinutes();
    }
    else{
      time = date.getHours()+':' + date.getMinutes();
    }
    return time;
  }
  getLastExam(){
    this.treatmentService.getExamRegistries(this.hemodialysisTreatmentID,(result,err?)=>{
      console.log(result);
      if(result){
        let objKey = Object.keys(result)[0];
        if(result[objKey].length != 0){
          if(result[objKey].length == 1){
            let date = new Date(result[objKey][0].date_of_exam);
            this.lastExam = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
            this.exams = this.translation.MESSAGE_PLACEHOLDER.EXAM.TEXT1 + " " + this.lastExam + '.';
          }else{
            let lastDate = new Date(result[objKey][0].date_of_exam);
            for(let i = 1; i < result[objKey].length; i++){
              let actualDate = new Date(result[objKey][i].date_of_exam);
              if(this.checkDate(actualDate,lastDate)){
                lastDate = actualDate;
                let date = new Date(lastDate);
                this.lastExam = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.exams = this.translation.MESSAGE_PLACEHOLDER.EXAM.TEXT1 + " " + this.lastExam + '.';
              }
            }
          }
        }
      }else{
        if(err.status == 401){
          this.navCtrl.setRoot("LoginPage");
        }else{
          this.navCtrl.push('InternetErrorPage');
        }
      };

    })
  }
  getLastWeight(){
    this.treatmentService.getLastWeight(this.hemodialysisTreatmentID,(result,err?)=>{
      if(result){
        if(result.dialysis_sessions.length > 0){
          let lastWeight = result.dialysis_sessions.pop();
          this.lastWeight = this.translation.MESSAGE_PLACEHOLDER.WEIGHT.TEXT1+ " " + lastWeight.dry_weight + 'kg. '+ this.translation.MESSAGE_PLACEHOLDER.WEIGHT.TEXT2+ " " + lastWeight.current_weight + 'kg.';
        }
      }else{
        if(err.status == 401){
          this.navCtrl.setRoot("LoginPage");
        }else{
          this.navCtrl.push('InternetErrorPage');
        }
      };
    })
  }
  checkDate(date,lastDate){

    if(date.getFullYear() > lastDate.getFullYear()){
      return true;
    }
    else{
      if(date.getMonth() > lastDate.getMonth() && date.getFullYear() == lastDate.getFullYear()){
        return true;

      }
      else{
        if(date.getDate() > lastDate.getDate() && date.getMonth() == lastDate.getMonth() && date.getFullYear() == lastDate.getFullYear()){
          return true;
        }
        else if(date.getDate() == lastDate.getDate() && date.getMonth() == lastDate.getMonth() && date.getFullYear() == lastDate.getFullYear()){
          return true;
        }
        else{
          return false;
        }
      }
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
}
