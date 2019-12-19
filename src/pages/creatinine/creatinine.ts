import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { CreatinineService } from './creatinine-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CreatininePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creatinine',
  templateUrl: 'creatinine.html',
})
export class CreatininePage {
  creatinine: any;
  creatinineList: any[] = [];
  creatinineData: number[] = [];
  transplantTreatmentID: number;
  selectedYear: number;
  checkYear: boolean = true;
  title: string;
  fade: any;
  scrollContentHeight: number;
  listHeight:  number;
  actualScroll: number = 0;
  placeholderFlag: boolean = true;
  translation: any;
  treatment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage, public creatinineService: CreatinineService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public translate: TranslateService) {
    //this.updateChart();

    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("CREATININE").subscribe((res)=>{
      this.title = res.TITLE.TITLE1;
      this.translation = res;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatininePage');
    /*let ctx = document.getElementById("creatinine");
    this.creatinine = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago", "Set", "Out", "Nov", "Dez"],
          datasets: [
              {
                  label: "Creatinina",
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
                    max: 12
                }
            }]
          }

        }

    });*/
    this.fade = document.getElementsByClassName('fade').item(0);
    this.scrollContentHeight = document.getElementsByClassName('scroll-content').item(1).clientHeight;
  }
  ionViewDidEnter(){
    this.checkFade();
  }
  ionViewWillEnter(){
    this.storage.get('usr').then((usr)=>{
      if(usr.user_type == 2){
        this.treatment = 'transplant_treatments';
      }else{
        this.treatment = 'conservative_treatments';
      }
      this.creatinineService.setTreatment(this.treatment);
    });
    this.updateChart();
  }
  openModal(page){
    let title;
    this.translate.get("CREATININE.TITLE.TITLE2").subscribe((res)=>{
      title = res;
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
    this.translate.get("CREATININE.LOADING_MESSAGE").subscribe((res)=>{
      message = res;
    });
    let updateLoader = this.loadingCtrl.create({
      content: message
    });
    updateLoader.present();
    this.creatinineData.splice(0,12);
    this.creatinineList.splice(0,this.creatinineList.length);
    let monthControl = [false,false,false,false,false,false,false,false,false,false,false,false];
    this.storage.get('usr').then((usr)=>{
      this.creatinineService.getTransplantTreatment(usr,(result,err?)=>{
        if(result){
          if(this.treatment == "transplant_treatments"){
            this.transplantTreatmentID = result.transplant_treatments.pop().id;
          }else{
            this.transplantTreatmentID = result.id;
          }
          this.creatinineService.getCreatinine(this.transplantTreatmentID,(result,err?)=>{
            console.log(result);
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

                  let month = date.getMonth();
                  if(this.selectedYear == date.getFullYear()){
                    this.creatinineList.push(result[objKey][i]);
                    if(monthControl[month] == false){
                      this.creatinineData[month] = result[objKey][i].creatinine;
                      monthControl[month] = true;
                    }
                  }
                  //this.creatinine.update();
                }
              }else{
                this.placeholderFlag = true;
              }
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
    })
  }
  openAddCreatinine(){
    let addCreatinine = this.modalCtrl.create('AddCreatininePage',null,{showBackdrop: true, enableBackdropDismiss: true})
    addCreatinine.onDidDismiss(data=>{
      if(data != null){
        console.log(data);
        this.creatinineService.postCreatinine(data,this.transplantTreatmentID,(result,err?)=>{
          if(result){
            this.creatinineService.sendAlert(this.translation.TOAST_MESSAGE_ADD,"success");
            console.log(result);
            this.updateChart();
            this.checkFade();
          }if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
          }else{
            this.navCtrl.push('InternetErrorPage');
          }

        })

      }
    });
    addCreatinine.present();
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
  deleteCreatinine(id: number, index: number){
    this.creatinineService.deleteCreatinine(id,this.transplantTreatmentID,(result)=>{
      this.creatinineService.sendAlert(this.translation.TOAST_MESSAGE_DELETE,"success");
      console.log('Creatinina Deletada');
      this.creatinineList.splice(index,1);
      this.updateChart();
      this.checkFade();

    });

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
  scroll(position: any){
    this.actualScroll = position.scrollTop;
    //console.log((position.scrollTop + window.innerHeight -70) +' '+ document.getElementById('list').clientHeight);
    if(position.scrollTop + window.innerHeight - 70 >= document.getElementById('list').clientHeight){
      this.fade.setAttribute('display','false');
    }
    else{
      this.fade.setAttribute('display','true');
    }
  }
  checkFade(){
    //this.listHeight = document.getElementById('list').clientHeight;
    setTimeout(() => {
      if(this.actualScroll + window.innerHeight - 70 >= document.getElementById('list').clientHeight){
        this.fade.setAttribute('display','false');
      }
      else{
        this.fade.setAttribute('display','true');
      }
    }, 10);

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
  openPage(page){
    this.navCtrl.push(page);
  }
  adjustDate(date: string){
    let regex = /^0./;
    let dateArray = date.split('-');
    if(regex.test(dateArray[2])){
      dateArray[2] = dateArray[2].slice(1,2);
    };
    if(regex.test(dateArray[1])){
      dateArray[1] = dateArray[1].slice(1,2);
    };
    return dateArray.join('-');
  }

}
