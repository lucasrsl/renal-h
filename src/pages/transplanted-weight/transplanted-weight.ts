import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { TransplantedWeightService } from './transplanted-weight-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TransplantedWeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transplanted-weight',
  templateUrl: 'transplanted-weight.html',
})
export class TransplantedWeightPage {
  weightList: any[] = [];
  transplantTreatmentID: number;
  fade: any;
  scrollContentHeight: number;
  listHeight:  number;
  actualScroll: number = 0;
  placeholderFlag: boolean = true;
  translation: any;
  treatment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public transplantedWeightService: TransplantedWeightService, public storage: Storage, private translate: TranslateService) {

    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("TRANSPLANTED_WEIGHT").subscribe((res)=>{
      this.translation = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransplantedWeightPage');
    this.fade = document.getElementsByClassName('fade').item(0);
    this.scrollContentHeight = document.getElementsByClassName('scroll-content').item(1).clientHeight;
  }
  ionViewWillEnter(){
    this.storage.get('usr').then((usr)=>{
      let treatment;
      if(usr.user_type == 2){
        treatment = 'transplant_treatments';
      }else{
        treatment = 'conservative_treatments';
      }
      this.treatment = treatment;
      this.transplantedWeightService.setTreatment(treatment);
    });
    this.updateData();
  }
  ionViewDidEnter(){
    this.checkFade();
  }
  openAddTransplantedWeight(){
    let addTransplantedWeight = this.modalCtrl.create('AddTransplantedWeightPage',null,{showBackdrop: true, enableBackdropDismiss: true})
    addTransplantedWeight.onDidDismiss(data=>{
      if(data != null){
        console.log(data);
        this.transplantedWeightService.postTransplantedWeight(data,this.transplantTreatmentID,(result,err?)=>{
          console.log(result);
          if(result){
            this.transplantedWeightService.sendAlert(this.translation.TOAST_MESSAGE_ADD,"success");
            this.updateData();
          }else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
            }else{
              this.navCtrl.push('InternetErrorPage');
            }
          };

        })

      }
    });
    addTransplantedWeight.present();
  }
  updateData(){
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    updateLoader.present()
    this.weightList.splice(0,this.weightList.length);
    this.storage.get('usr').then((usr)=>{
      this.transplantedWeightService.getTransplantTreatment(usr,(result,err?)=>{
        if(result){
          if(this.treatment == "transplant_treatments"){
            this.transplantTreatmentID = result.transplant_treatments.pop().id;
          }else{
            this.transplantTreatmentID = result.id;
          }
          this.transplantedWeightService.getTransplantedWeight(this.transplantTreatmentID,(result,err?)=>{
            if(result){
              let objKey = Object.keys(result)[0];
              if(result[objKey].length != 0){
                this.placeholderFlag = false;
                for(let i = 0; i < result[objKey].length; i++){
                  //let date = new Date(this.adjustDate(result[objKey][i].date_of_weight));
                  let date = new Date(result[objKey][i].date_of_weight);
                  result[objKey][i].date_of_weight = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                  this.weightList.push(result[objKey][i]);
                }
                this.checkFade();
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
  deleteTransplantedWeight(id: number, index: number){
    this.transplantedWeightService.deleteTransplantedWeight(id,this.transplantTreatmentID,(result,err?)=>{
      console.log('Peso deletado');
      if(result){
        this.transplantedWeightService.sendAlert(this.translation.TOAST_MESSAGE_DELETE,"success");
        this.weightList.splice(index,1);
        this.updateData();
        this.checkFade();
      }else{
        if(err.status == 401){
          this.navCtrl.setRoot("LoginPage");
        }else{
          this.navCtrl.push('InternetErrorPage');
        }
      };
    });

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
