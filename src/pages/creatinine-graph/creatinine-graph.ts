import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { CreatinineGraphService } from './creatinine-graph-service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CreatinineGraphPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creatinine-graph',
  templateUrl: 'creatinine-graph.html',
})
export class CreatinineGraphPage {
  creatinine: any;
  creatinineList: any[] = [];
  creatinineData: number[] = [];
  transplantTreatmentID: number;
  selectedYear: number;
  checkYear: boolean = true;
  title: string;
  placeholderFlag: boolean = true;
  treatment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public storage: Storage, public creatinineGraphService: CreatinineGraphService, public alertCtrl: AlertController,public modalCtrl: ModalController, public translate: TranslateService) {
    this.storage.get('usr').then((usr)=>{
      if(usr.user_type == 2){
        this.treatment = 'transplant_treatments';
      }else{
        this.treatment = 'conservative_treatments';
      }
      this.creatinineGraphService.setTreatment(this.treatment);
    });
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("CREATININE.TITLE.TITLE1").subscribe((res)=>{
      this.title = res;
    });
  }
  ionViewWillEnter(){
    this.updateChart();
  }

  ionViewDidLoad() {
    let months;
    let title;
    this.translate.get("CREATININE_GRAPH.MONTHS").subscribe((res)=>{
      months = res;
    })
    this.translate.get('CREATININE_GRAPH.TITLE.TITLE1').subscribe((res)=>{
      title = res
    });
    console.log('ionViewDidLoad CreatinineGraphPage');
    let ctx = document.getElementById("creatinine");
    this.creatinine = new Chart(ctx, {
      type: 'line',
      data: {
          labels: months,
          datasets: [
              {
                  label: title,
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "#97c6ff",
                  borderColor: "#97c6ff",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "#00709c",
                  pointBackgroundColor: "#00709c",
                  pointBorderWidth: 3.5,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "#00709c",
                  pointHoverBorderColor: "#00709c",
                  pointHoverBorderWidth: 2,
                  pointRadius: 3,
                  pointHitRadius: 10,
                  data: this.creatinineData,
                  spanGaps: false,
              }
          ],
        },
        options:{
          legend:{
            display: false
          },
          scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    // OR //
                    beginAtZero: true,   // minimum value will be 0.
                    suggestedMax: 12
                }
            }]
          }

        }

    });
  }
  openModal(page){
    let title
    this.translate.get('CREATININE_GRAPH.TITLE.TITLE2').subscribe((res)=>{
      title = res
    });
    let dateSelect = this.modalCtrl.create(page,null,{showBackdrop:true, enableBackdropDismiss:true})
    dateSelect.onDidDismiss(data=>{
        if(data){
          this.selectedYear = data;
          this.title = title + this.selectedYear;
          this.updateChart();
        }

    })
    dateSelect.present();
  }
  updateChart(){
    let message;
    this.translate.get("CREATININE_GRAPH.LOADING_MESSAGE").subscribe((res)=>{
      message = res;
    })
    let updateLoader = this.loadingCtrl.create({
      content: message
    });
    updateLoader.present()
    this.creatinineData.splice(0,12);
    this.creatinineList.splice(0,this.creatinineList.length);
    let monthControl = [false,false,false,false,false,false,false,false,false,false,false,false];
    this.storage.get('usr').then((usr)=>{
      this.creatinineGraphService.getTransplantTreatment(usr,(result,err?)=>{
        if(result){
          if(this.treatment == "transplant_treatments"){
            this.transplantTreatmentID = result.transplant_treatments.pop().id;
          }else{
            this.transplantTreatmentID = result.id;
          }
          this.creatinineGraphService.getCreatinine(this.transplantTreatmentID,(result,err?)=>{
            if(result){
              let objKey = Object.keys(result)[0];
              if(result[objKey].length != 0){
                this.placeholderFlag = false;
                if(this.checkYear){
                  this.checkLastYear(result[objKey]);
                  this.checkYear = false;
                  this.translate.get("CREATININE.TITLE.TITLE2").subscribe((res)=>{
                    this.title = res + this.selectedYear;
                  });
                }
                for(let i = 0; i < result[objKey].length; i++){
                  let date = new Date(result[objKey][i].date_of_creatinine);
                  result[objKey][i].date_of_creatinine = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                  this.creatinineList.push(result[objKey][i]);
                  let month = date.getMonth();
                  if(this.selectedYear == date.getFullYear()){
                    if(monthControl[month] == false){
                      this.creatinineData[month] = result[objKey][i].creatinine;
                      monthControl[month] = true;
                    }
                  }
                  this.creatinine.update();
                }
              }else{
                this.placeholderFlag = true;
              }

            }else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
              }else{
                this.navCtrl.push('InternetErrorPage');
              }
            };

          })
          updateLoader.dismiss();
        }else{
          if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
          }else{
            this.navCtrl.push('InternetErrorPage');
          }
        };

      })
    })
  }
  checkLastYear(list){
    let lastDate = new Date(list[0].date_of_creatinine);
    if(list.length > 1){
      for(let i = 1; i<list.length ;i++){
      let actualDate = new Date(list[i].date_of_creatinine);
      this.selectedYear = lastDate.getFullYear();
        if(actualDate.getFullYear() > lastDate.getFullYear()){
          lastDate = actualDate;
          this.selectedYear = lastDate.getFullYear();
        }
      }
    }
    else{
      this.selectedYear = lastDate.getFullYear();
    }
  }
  //Traduzir
  changeYear(){
    let title;
    let cancelButton;
    let selectButton;
    let placeholder;
    let alertTitle

    this.translate.get('CREATININE_GRAPH.TITLE.TITLE2').subscribe((res)=>{
      title = res
    });
    this.translate.get('CREATININE_GRAPH.ALERT').subscribe((res)=>{
      selectButton = res.BUTTONS.SELECT;
      alertTitle = res.TITLE;
      cancelButton = res.BUTTONS.CANCELAR;
      placeholder = res.PLACEHOLDER;
    });


    let yearSelect = this.alertCtrl.create(({
      title: alertTitle,
      cssClass: 'alert-class',
      inputs: [
        {
          name: 'year',
          placeholder: placeholder,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: cancelButton,
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: selectButton,
          handler: data => {
            this.selectedYear = data.year;
            this.title = title + this.selectedYear;
            this.updateChart();
          }
        }
      ]
    }));
    yearSelect.present();


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
