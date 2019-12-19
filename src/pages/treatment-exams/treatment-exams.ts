import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Content, AlertController } from 'ionic-angular';
import { TreatmentExamsService } from './treatment-exams-service';


@IonicPage()
@Component({
  selector: 'page-treatment-exams',
  templateUrl: 'treatment-exams.html',
})
export class TreatmentExamsPage {
  exams: any[] = [];
  placeholderFlag: boolean = true
  hemodialysisTreatmentID: string;
  fade: any;
  scrollContentHeight: number;
  listHeight: number;
  selectedYear: number;
  checkYear: boolean = true;
  title: string = 'exames';
  translation: any;
  treatment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams , public modalCtrl: ModalController, public treatmentExamsService: TreatmentExamsService, public storage: Storage,public loadingCtrl: LoadingController, public alertCtrl: AlertController, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("TREATMENT_EXAMS").subscribe((res)=>{
      this.translation = res;
      this.title = res.TITLE1
    });
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad TreatmentExamsPage');
    this.fade = document.getElementsByClassName('fade').item(0);
    this.scrollContentHeight = document.getElementsByClassName('scroll-content').item(1).clientHeight


  }
  ionViewWillEnter(){
    this.storage.get('usr').then((usr)=>{
      if(usr.user_type == 1){
        this.treatment = 'hemodialysis_treatments';
      }else{
        this.treatment = 'conservative_treatments';
      }
      this.treatmentExamsService.setTreatment(this.treatment);
    });
    this.checkExams();
  }
  ionViewDidEnter(){


    this.checkFade();
  }
  openAddTreatmentExam(){
    let addTreatmentExam = this.modalCtrl.create('AddTreatmentExamPage',null,{showBackdrop:true, enableBackdropDismiss:true});
    addTreatmentExam.onDidDismiss(data =>{
      let updateLoader = this.loadingCtrl.create({
        content: this.translation.LOADING_MESSAGE
      });

      console.log(data);
      if(data != null){
        updateLoader.present();
        let exam_registry
        if(this.treatment == "hemodialysis_treatments"){
          exam_registry = {
            "exam_registry":data.value
          }
        }else{
          exam_registry = {
            "exam_registry_conservatives":data.value
          }
        }

        this.treatmentExamsService.postExamRegistry(exam_registry,this.hemodialysisTreatmentID,(result,err?)=>{
          if(result){
            this.treatmentExamsService.sendAlert(this.translation.TOAST_MESSAGE_ADD,"success");
            //let date = new Date(result.date_of_exam);
            //result.date_of_exam = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
            //this.exams.push(result);

            this.placeholderFlag = false;
            this.checkExams();
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
        console.log(exam_registry);
      }


    });
    addTreatmentExam.present();
  }
  deleteExam(id: number, index: number){
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    let deleteAlert = this.alertCtrl.create({
      subTitle: this.translation.ALERT.TITLE,
      cssClass: 'delete-alert',
      buttons: [
        {
          text: this.translation.ALERT.BUTTONS._1,
          role: 'cancel'
        },
        {
          text: this.translation.ALERT.BUTTONS._2,
          handler: () =>{
            updateLoader.present();
            this.treatmentExamsService.deleteExamRegistries(id,this.hemodialysisTreatmentID,(result,err?)=>{
              if(result){
                this.treatmentExamsService.sendAlert(this.translation.TOAST_MESSAGE_DELETE,"success");
                console.log('Exame Deletado');
                this.exams.splice(index,1);
                this.treatmentExamsService.getExamRegistries(this.hemodialysisTreatmentID,(result,err?)=>{
                  if(result){
                    let objKey = Object.keys(result)[0];
                    if(result[objKey].length == 0){
                      this.placeholderFlag = true;
                    }
                    this.checkExams();
                    this.checkFade();
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
              }else{
                if(err.status == 401){
                  this.navCtrl.setRoot("LoginPage");
                  updateLoader.dismiss();
                }else{
                  this.navCtrl.push('InternetErrorPage');
                  updateLoader.dismiss();
                }
              };


            });
          }
        }

      ]
    });
    deleteAlert.present();


  }
  scroll(teste: any){
    this.listHeight = document.getElementById('list').clientHeight;
    //console.log(teste.scrollTop + window.innerHeight - 70 +' '+ document.getElementById('list').clientHeight);
    if(teste.scrollTop + window.innerHeight - 70 >= this.listHeight){
      this.fade.setAttribute('display','false');
    }
    else{
      this.fade.setAttribute('display','true');
    }
  }
  checkFade(){
    this.listHeight = document.getElementById('list').clientHeight
    console.log(this.listHeight);
    setTimeout(() => {
      if(this.scrollContentHeight <= document.getElementById('list').clientHeight){
        this.fade.setAttribute('display','true');
      }
      else{
        this.fade.setAttribute('display','false');
      }
    }, 10);

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
  checkExams(){
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    this.storage.get('usr').then((usr)=>{
      updateLoader.present();
      this.treatmentExamsService.getHemodialysisTreatment(usr,(result,err?)=>{
        if(result){
          if(this.treatment == "hemodialysis_treatments"){
            let hemodialysisTreatment = result.hemodialysis_treatments.pop();
            this.hemodialysisTreatmentID = hemodialysisTreatment.id;
          }else{
            let objKey = Object.keys(result)[0];
            this.hemodialysisTreatmentID = result[objKey];
          }

          this.treatmentExamsService.getExamRegistries(this.hemodialysisTreatmentID,(result,err?)=>{
          if(result){
            let objKey = Object.keys(result)[0];
            this.exams = [];
            console.log(result[objKey]);
            if(result[objKey].length == 0){
              this.placeholderFlag = true;
              updateLoader.dismiss();
            }
            else{
              this.placeholderFlag = false;
              if(this.checkYear){
                this.checkLastYear(result[objKey]);
                this.title = this.translation.TITLE2 + ' '+ this.selectedYear;
                this.checkYear = false;
              }

              for(let i = 0; i < result[objKey].length; i++){
                let date = new Date(result[objKey][i].date_of_exam);
                if(this.selectedYear == date.getFullYear()){
                  if(result[objKey][i].calcium == null){
                    result[objKey][i].calcium = '-';
                  }else{
                    result[objKey][i].calcium = result[objKey][i].calcium + " mg/dl";
                  };
                  if(result[objKey][i].phosphorus == null){
                    result[objKey][i].phosphorus = '-';
                  }else{
                    result[objKey][i].phosphorus = result[objKey][i].phosphorus + " mg/dl";
                  };
                  if(result[objKey][i].potassium == null){
                    result[objKey][i].potassium = '-';
                  }else{
                    result[objKey][i].potassium = result[objKey][i].potassium + " mg/dl";
                  };
                  result[objKey][i].date_of_exam = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                  this.exams.push(result[objKey][i]);
                }
              }
              this.exams.reverse();
              if(this.exams.length == 0){
                this.placeholderFlag = true;
              }
              this.checkFade();
              updateLoader.dismiss();
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
  changeYear(){
    let yearSelect = this.alertCtrl.create(({
      title: 'Selecione o Ano',
      cssClass: 'alert-class',
      inputs: [
        {
          name: 'year',
          placeholder: 'Ano',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'SELECIONAR',
          handler: data => {
            this.selectedYear = data.year;
            this.title = 'exames de '+ this.selectedYear;
            this.checkExams();
          }
        }
      ]
    }));
    yearSelect.present();


  }
  openModal(page){
    let dateSelect = this.modalCtrl.create(page,null,{showBackdrop:true, enableBackdropDismiss:true})
    dateSelect.onDidDismiss(data=>{
        if(data){
          this.selectedYear = data;
          this.title = 'exames de '+ this.selectedYear;
          this.checkExams();
        }

    })
    dateSelect.present();
  }
  checkExamValueNull(exam){

  }
  showGraph(){
    this.navCtrl.push('HistoricTreatmentPage', {selectedYear: this.selectedYear});
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
