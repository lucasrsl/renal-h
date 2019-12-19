import { TranslateService } from '@ngx-translate/core';
import { HistoricTreatmentService } from './historic-treatment-service';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-historic-treatment',
  templateUrl: 'historic-treatment.html',
})
export class HistoricTreatmentPage {
  @ViewChild('lineCanvas') lineCanvas;
  calcium: any;
  potassium: any;
  phosphor: any;
  hemodialysisTreatmentID: number;
  selectedYear: number;
  calciumData: number[] = [];
  potassiumData: number[] = [];
  phosphorData: number[] = [];
  checkYear: boolean = true;
  title: string = 'Exames';
  placeholderFlag: boolean = true;
  traslation: any;
  treatment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public historicTreatmentSerivce: HistoricTreatmentService, public alertCtrl: AlertController,public loadingCtrl: LoadingController, public modalCtrl: ModalController, private translate: TranslateService) {
    this.selectedYear = this.navParams.get("selectedYear");

    console.log(this.selectedYear);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get('HISTORIC_TREATMENT').subscribe((res)=>{
      this.traslation = res;
      this.title = res.TITLE.TITLE1;
    });
    if(this.selectedYear){
      this.checkYear = false;
      this.title = this.traslation.TITLE.TITLE2 + this.selectedYear;
    }
    this.createHelperIntervalChart();


  }
  createHelperIntervalChart(){
    var originalLineDraw = Chart.controllers.line.prototype.draw;
    Chart.helpers.extend(Chart.controllers.line.prototype, {
      draw : function() {
        var chart = this.chart;
        var yHighlightRange = chart.config.data.yHighlightRange;

        if (yHighlightRange !== undefined) {
          var ctx = chart.chart.ctx;
          var yRangeBegin = yHighlightRange.begin;
          var yRangeEnd = yHighlightRange.end;
          var xaxis = chart.scales['x-axis-0'];
          var yaxis = chart.scales['y-axis-0'];

          var yRangeBeginPixel = yaxis.getPixelForValue(yRangeBegin);
          var yRangeEndPixel = yaxis.getPixelForValue(yRangeEnd);
          ctx.save();
          ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
          ctx.fillRect(xaxis.left, Math.min(yRangeBeginPixel, yRangeEndPixel), xaxis.right - xaxis.left, Math.max(yRangeBeginPixel, yRangeEndPixel) - Math.min(yRangeBeginPixel, yRangeEndPixel));
          ctx.restore();
        }
        originalLineDraw.apply(this, arguments);
      }
    });
  }
  createChartCalcium(){
    let ctx = document.getElementById("calcium");
    this.calcium = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.traslation.MONTHS,
          datasets: [
              {
                  label: this.traslation.LABEL3,
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
                  data: this.calciumData,
                  //data: [1,5,10,15,8],
                  spanGaps: false,
              }
          ],
          yHighlightRange : {
             begin: 8.4,
             end: 9.5
          },
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
                  beginAtZero: true   // minimum value will be 0.
              }
          }]
        }

      }

    });
  }
  createChartPotassium(){
    let ctx = document.getElementById("potassium");

    this.potassium = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.traslation.MONTHS,
          datasets: [
              {
                  label: this.traslation.LABEL4,
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
                  data: this.potassiumData,
                  //data: [1,5,10,11,8],
                  spanGaps: false,
              }
          ],
          yHighlightRange : {
             begin: 3.5,
             end: 5.5
          },
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
                    beginAtZero: true   // minimum value will be 0.
                }
            }]
          }

        }

    });
  }
  createChartPhosphor(){
    let ctx = document.getElementById("phosphor")
    this.phosphor = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.traslation.MONTHS,
          datasets: [
              {
                  label: this.traslation.LABEL5,
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
                  data: this.phosphorData,
                  //data: [1,5,10,11,8],
                  spanGaps: false,
              }
          ],
          yHighlightRange : {
             begin: 3.5,
             end: 5.5
          },
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
                    beginAtZero: true   // minimum value will be 0.
                }
            }]
          }

        }

    });
  }
  ionViewDidLoad(){
    this.createChartCalcium();
    this.createChartPotassium();
    this.createChartPhosphor();
  }
  ionViewWillEnter(){
    this.storage.get('usr').then((usr)=>{
      if(usr.user_type == 1){
        this.treatment = 'hemodialysis_treatments';
      }else{
        this.treatment = 'conservative_treatments';
      }
      this.historicTreatmentSerivce.setTreatment(this.treatment);
    });
    this.updateChart();
  }
  changeYear(){
    let yearSelect = this.alertCtrl.create(({
      title: this.traslation.ALERT.TITLE,
      cssClass: 'alert-class',
      inputs: [
        {
          name: 'year',
          placeholder: this.traslation.ALERT.PLACEHOLDER,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: this.traslation.ALERT.BUTTONS.CANCELAR,
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.traslation.ALERT.BUTTONS.SELECT,
          handler: data => {
            this.selectedYear = data.year;
            this.title = this.traslation.TITLE.TITLE2 + this.selectedYear;
            this.updateChart();
          }
        }
      ]
    }));
    yearSelect.present();


  }
  updateChart(){
    console.log(this.checkYear);
    console.log('Fazendo update dos Gráficos')
    let updateLoader = this.loadingCtrl.create({
      content: this.traslation.LOADING_MESSAGE
    });
    updateLoader.present()
    this.calciumData.splice(0,12);
    this.potassiumData.splice(0,12);
    this.phosphorData.splice(0,12);
    let monthControl = [false,false,false,false,false,false,false,false,false,false,false,false];
    this.storage.get('usr').then((usr)=>{
      this.historicTreatmentSerivce.getHemodialysisTreatment(usr,(result)=>{
        if(result){
          if(this.treatment == "hemodialysis_treatments"){
            let hemodialysisTreatment = result.hemodialysis_treatments.pop();
            this.hemodialysisTreatmentID = hemodialysisTreatment.id;
          }else{
            let objKey = Object.keys(result)[0];
            this.hemodialysisTreatmentID = result[objKey];
          }

          this.historicTreatmentSerivce.getExamRegistries(this.hemodialysisTreatmentID,(result)=>{
            if(result){
              let objKey = Object.keys(result)[0];
              if(result[objKey].length != 0){
                this.placeholderFlag = false;
                console.log(result[objKey]);
                if(this.checkYear){
                  this.checkLastYear(result[objKey]);
                  this.checkYear = false;
                  this.title = this.traslation.TITLE.TITLE2 + this.selectedYear;
                }
                for(let i = 0; i < result[objKey].length; i++){
                  let date = new Date(result[objKey][i].date_of_exam);
                  let month = date.getMonth();
                  if(this.selectedYear == date.getFullYear()){
                    if(monthControl[month] == false){
                      if(this.calciumData[month] != null && this.potassiumData[month] != null && this.phosphorData[month] != null){
                        monthControl[month] = true;
                      }else{
                        if(result[objKey][i].calcium != null){
                          this.calciumData[month] = result[objKey][i].calcium;
                        }
                        if(result[objKey][i].potassium != null){
                          this.potassiumData[month] = result[objKey][i].potassium;
                        }
                        if(result[objKey][i].phosphorus != null){
                          this.phosphorData[month] = result[objKey][i].phosphorus;
                        }

                      };

                    };
                  }
                  this.calcium.update();
                  this.potassium.update();
                  this.phosphor.update();


                }
              }else{
                if(this.checkYear){
                  let year =  new Date();
                  this.selectedYear = year.getFullYear();
                  this.placeholderFlag = true;
                  this.title = this.traslation.TITLE.TITLE2 + this.selectedYear;
                }
              }

            }else{
              this.navCtrl.push('InternetErrorPage');
            };
            updateLoader.dismiss();



          })
        }else{
          this.navCtrl.push('InternetErrorPage');
        };


      })

    })
  }
  checkLastYear(list){
    let lastDate = new Date(list[0].date_of_exam);
    if(list.length > 1){
      for(let i = 1; i<list.length ;i++){
        let actualDate = new Date(list[i].date_of_exam);
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
  openModal(page){
    let dateSelect = this.modalCtrl.create(page,null,{showBackdrop:true, enableBackdropDismiss:true})
    dateSelect.onDidDismiss(data=>{
        if(data){
          this.selectedYear = data;
          this.title = this.traslation.TITLE.TITLE2 + this.selectedYear;
          this.updateChart();
        }

    })
    dateSelect.present();
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
