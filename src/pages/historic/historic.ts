import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HistoricService } from './historic-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the HistoricPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historic',
  templateUrl: 'historic.html',
})
export class HistoricPage {
  transplantTreatmentID: number;
  creatinine: string = 'Não há registro de creatinina';
  bloodPressure: string = 'Não há registro de pressão arterial';
  weight: string = 'Não há registro de peso';
  glucose: string = 'Não há registro de glicemia';
  treatment: string;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public historicService: HistoricService, public loadingCtrl: LoadingController, private modalCtrl: ModalController, private translate: TranslateService) {

    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("HISTORIC").subscribe((res)=>{
      this.translation = res;
      console.log(res);
      this.creatinine = res.PLACEHOLDER.CREATININE;
      this.bloodPressure = res.PLACEHOLDER.BLOOD_PRESSURE;
      this.weight = res.PLACEHOLDER.WEIGHT;
      this.glucose = res.PLACEHOLDER.GLUCOSE;
    });

  }
  ionViewWillEnter(){
    this.storage.get('usr').then((usr)=>{
      if(usr.user_type == 2){
        this.treatment = 'transplant_treatments';
      }else{
        this.treatment = 'conservative_treatments';
      }
    });
    this.updateData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricPage');
  }
  openPage(page: string){
    this.navCtrl.push(page);
  }
  updateData(){
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    updateLoader.present();
    this.storage.get('usr').then((usr)=>{
      this.historicService.getTreatment(usr,this.treatment,(result,err?)=>{
        if(result){
          if(this.treatment == "transplant_treatments"){
            this.transplantTreatmentID = result.transplant_treatments[0].id;
          }else{
            this.transplantTreatmentID = result.id;
          }
          this.checkCreatinine();
          this.checkBloodPress();
          this.checkWeight();
          this.checkBloodGlucose();
          updateLoader.dismiss();
        }else{
          if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
            updateLoader.dismiss();
          }else{
            this.navCtrl.push('InternetErrorPage');
            updateLoader.dismiss();
          }
        }

      })
    });
  }
  checkCreatinine(){
    this.historicService.getCreatinine(this.transplantTreatmentID,this.treatment, (result,err?)=>{
      if(result){
        let objKey = Object.keys(result)[0];
        if(result[objKey].length != 0){
          //let adjustedDate = this.adjustDate(result[objKey][0].date_of_creatinine);
          let adjustedDate = result[objKey][0].date_of_creatinine;
          if(result[objKey].length == 1){
            let date = new Date(adjustedDate);
            let lastCreatinine = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
            this.creatinine = this.translation.PLACEHOLDER_MESSAGE + lastCreatinine + ': ' + result[objKey][0].creatinine + 'mg/dL';
          }
          else{
            let lastDate = new Date(adjustedDate);
            for(let i = 0; i< result[objKey].length; i++){
              //let actualDate = new Date(this.adjustDate(result[objKey][i].date_of_creatinine));
              let actualDate = new Date(result[objKey][i].date_of_creatinine);
              if(this.checkDate(actualDate,lastDate)){
                lastDate = actualDate;
                let date = new Date(lastDate);
                let lastCreatinine = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.creatinine = this.translation.PLACEHOLDER_MESSAGE + lastCreatinine + ': ' + result[objKey][i].creatinine + 'mg/dL';
              }else{
                let date = new Date(adjustedDate);
                let lastCreatinine = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.creatinine = this.translation.PLACEHOLDER_MESSAGE + lastCreatinine + ': ' + result[objKey][0].creatinine + 'mg/dL';
              }
            }
          }
        }else{
          this.creatinine = this.translation.PLACEHOLDER.CREATININE;
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
  checkBloodPress(){
    this.historicService.getBloodPressure(this.transplantTreatmentID,this.treatment, (result,err?)=>{
      if(result){
        let objKey = Object.keys(result)[0];
        if(result[objKey].length != 0){
          //let adjustedDate = this.adjustDate(result[objKey][0].date_of_pressure);
          let adjustedDate = result[objKey][0].date_of_pressure;
          if(result[objKey].length == 1){
            let date = new Date(adjustedDate);
            let lastBloodPressure = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
            this.bloodPressure = this.translation.PLACEHOLDER_MESSAGE + lastBloodPressure + ': ' + result[objKey][0].measure_pressure + 'mmHg';
          }
          else{
            let lastDate = new Date(adjustedDate);
            for(let i = 0; i< result[objKey].length; i++){
              //let actualDate = new Date(this.adjustDate(result[objKey][i].date_of_pressure));
              let actualDate = new Date(result[objKey][i].date_of_pressure);
              if(this.checkDate(actualDate,lastDate)){
                lastDate = actualDate;
                let date = new Date(lastDate);
                let lastBloodPressure = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.bloodPressure = this.translation.PLACEHOLDER_MESSAGE + lastBloodPressure + ': ' + result[objKey][i].measure_pressure + 'mmHg';
              }else{
                let date = new Date(adjustedDate);
                let lastBloodPressure = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.bloodPressure = this.translation.PLACEHOLDER_MESSAGE + lastBloodPressure + ': ' + result[objKey][0].measure_pressure + 'mmHg';
              }
            }
          }
        }else{
          this.bloodPressure = this.translation.PLACEHOLDER.BLOOD_PRESSURE;
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
  checkWeight(){
    this.historicService.getWeight(this.transplantTreatmentID,this.treatment, (result,err?)=>{
      if(result){
        let objKey = Object.keys(result)[0];
        if(result[objKey].length != 0){
          //let adjustedDate = this.adjustDate(result[objKey][0].date_of_weight);
          let adjustedDate = result[objKey][0].date_of_weight;
          if(result[objKey].length == 1){
            let date = new Date(adjustedDate);
            let lastWeight = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
            this.weight = this.translation.PLACEHOLDER_MESSAGE + lastWeight + ': ' + result[objKey][0].weight + 'kg';

          }
          else{
            let lastDate = new Date(adjustedDate);
            for(let i = 0; i< result[objKey].length; i++){
              //let actualDate = new Date(this.adjustDate(result[objKey][i].date_of_weight));
              let actualDate = new Date(result[objKey][i].date_of_weight);
              if(this.checkDate(actualDate,lastDate)){
                lastDate = actualDate;
                let date = new Date(lastDate);
                let lastWeight = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.weight = this.translation.PLACEHOLDER_MESSAGE + lastWeight + ': ' + result[objKey][i].weight + 'kg';
              }else{
                let date = new Date(adjustedDate);
                let lastWeight = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.weight = this.translation.PLACEHOLDER_MESSAGE + lastWeight + ': ' + result[objKey][0].weight + 'kg';

              }
            }
          }
        }else{
          this.weight = this.translation.PLACEHOLDER.WEIGHT;
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
  checkBloodGlucose(){
    this.historicService.getBloodGlucose(this.transplantTreatmentID,this.treatment, (result,err?)=>{
      if(result){
        let objKey = Object.keys(result)[0];
        if(result[objKey].length != 0){
          //let adjustedDate = this.adjustDate(result[objKey][0].date_of_glucose);
          let adjustedDate = result[objKey][0].date_of_glucose;
          if(result[objKey].length == 1){
            let date = new Date(adjustedDate);
            console.log(adjustedDate);
            let lastGlucose = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
            this.glucose = this.translation.PLACEHOLDER_MESSAGE + lastGlucose + ': ' + result[objKey][0].blood_glucose + 'mg/dL';

          }
          else{
            let lastDate = new Date(adjustedDate);
            for(let i = 0; i< result[objKey].length; i++){
              //let actualDate = new Date(this.adjustDate(result[objKey][i].date_of_glucose));
              let actualDate = new Date(result[objKey][i].date_of_glucose);
              if(this.checkDate(actualDate,lastDate)){

                lastDate = actualDate;
                let date = new Date(lastDate);
                let lastGlucose = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.glucose = this.translation.PLACEHOLDER_MESSAGE + lastGlucose + ': ' + result[objKey][i].blood_glucose + 'mg/dL';
              }else{
                let date = new Date(adjustedDate);
                let lastGlucose = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                this.glucose = this.translation.PLACEHOLDER_MESSAGE + lastGlucose + ': ' + result[objKey][0].blood_glucose + 'mg/dL';
              }
            }
          }
        }else{
          this.glucose = this.translation.PLACEHOLDER.GLUCOSE;
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
        else{
          return false;

        }
      }
    }
  }
  openModal(page: string){
    let addHistoric = this.modalCtrl.create(page,null,{showBackdrop: true, enableBackdropDismiss: true})
    addHistoric.onDidDismiss(data=>{
      if(data != null){
        console.log(data);
        if(page === "AddBloodPressurePage"){
          this.historicService.postBloodPressure(data,this.transplantTreatmentID,this.treatment,(result,err?)=>{
            if(result){
              this.historicService.sendAlert(this.translation.TOAST_MESSAGE.BLOOD_PRESSURE,"success");
              console.log(result);
              this.updateData();
            }else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
              }else{
                this.navCtrl.push('InternetErrorPage');
              }
            };
          });
        }else if(page === "AddTransplantedWeightPage"){
          this.historicService.postWeight(data,this.transplantTreatmentID,this.treatment,(result,err?)=>{
            if(result){
              this.historicService.sendAlert(this.translation.TOAST_MESSAGE.WEIGHT,"success");
              console.log(result);
              this.updateData();
            }else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
              }else{
                this.navCtrl.push('InternetErrorPage');
              }
            };
          });
        }else if(page === "AddBloodGlucosePage"){
          this.historicService.postBloodGlucose(data,this.transplantTreatmentID,this.treatment,(result,err?)=>{
            if(result){
              this.historicService.sendAlert(this.translation.TOAST_MESSAGE.BLOOD_GLUCOSE,"success");
              console.log(result);
              this.updateData();
            }else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
              }else{
                this.navCtrl.push('InternetErrorPage');
              }
            };
          });
        }else if(page === "AddCreatininePage"){
          this.historicService.postCreatinine(data,this.transplantTreatmentID,this.treatment,(result,err?)=>{
            if(result){
              this.historicService.sendAlert(this.translation.TOAST_MESSAGE.CREATININE,"success");
              console.log(result);
              this.updateData();
            }else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
              }else{
                this.navCtrl.push('InternetErrorPage');
              }
            };
          });
        }

      }
    });
    addHistoric.present();
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
  adjustDate(date: string){
    let regex = /^0./;
    let dateArray = date.split('-');
    if(regex.test(dateArray[2])){
      dateArray[2] = dateArray[2].slice(1,2);
    };
    return dateArray.join('-');
  }
}
