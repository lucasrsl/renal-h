import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BloodGlucoseService } from './blood-glucose-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the BloodGlucosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blood-glucose',
  templateUrl: 'blood-glucose.html',
})
export class BloodGlucosePage {
  bloodGlucoseList: any[] = [];
  transplantTreatmentID: number;
  fade: any;
  scrollContentHeight: number;
  listHeight:  number;
  actualScroll: number = 0;
  placeholderFlag: boolean = true;
  treatment: string;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public bloodGlucoseService: BloodGlucoseService, public storage: Storage,  public translate: TranslateService) {

    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    }
    this.translate.get("BLOOD_GLUCOSE").subscribe((res)=>{
      this.translation = res;
    });
  }
  ionViewWillEnter(){
    this.storage.get('usr').then((usr)=>{
      if(usr.user_type == 2){
        this.treatment = 'transplant_treatments';
      }else{
        this.treatment = 'conservative_treatments';
      }
      this.bloodGlucoseService.setTreatment(this.treatment);
    });
    this.updateData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BloodGlucosePage');
    this.fade = document.getElementsByClassName('fade').item(0);
    this.scrollContentHeight = document.getElementsByClassName('scroll-content').item(1).clientHeight;
  }
  ionViewDidEnter(){
    this.checkFade();
  }
  openAddBloodGlucose(){
    let addBloodGlucose = this.modalCtrl.create('AddBloodGlucosePage',null,{showBackdrop: true, enableBackdropDismiss: true})
    addBloodGlucose.onDidDismiss(data=>{
      if(data != null){
        console.log(data);
        this.bloodGlucoseService.postBloodGlucose(data,this.transplantTreatmentID,(result,err?)=>{
          if(result){
            this.bloodGlucoseService.sendAlert(this.translation.TOAST_MESSAGE_ADD,"success");
            console.log(result);
            this.updateData();
            this.checkFade();
          }
          else{
            if(err.status == 401){
              this.navCtrl.setRoot("LoginPage");
            }else{
              this.navCtrl.push('InternetErrorPage');
            }
          }
        })

      }
    });
    addBloodGlucose.present();
  }
  updateData(){
    let message;
    this.translate.get("CREATININE.LOADING_MESSAGE").subscribe((res)=>{
      message = res;
    })
    let updateLoader = this.loadingCtrl.create({
      content: message
    });
    updateLoader.present();
    this.bloodGlucoseList.splice(0,this.bloodGlucoseList.length);
    this.storage.get('usr').then((usr)=>{
      this.bloodGlucoseService.getTreatment(usr,(result,err?)=>{
        if(result){
          if(this.treatment == "transplant_treatments"){
            this.transplantTreatmentID = result.transplant_treatments.pop().id;
          }else{
            this.transplantTreatmentID = result.id;
          }
          this.bloodGlucoseService.getBloodGlucose(this.transplantTreatmentID,(result,err?)=>{
            console.log(result);
            if(result){
              let objKey = Object.keys(result)[0];
              if(result[objKey].length != 0){
                this.placeholderFlag = false;
                for(let i = 0; i < result[objKey].length; i++){
                  //let date = new Date((this.adjustDate(result[objKey][i].date_of_glucose))+ " GMT");
                  let date = new Date(result[objKey][i].date_of_glucose);
                  result[objKey][i].date_of_glucose = ((date.getUTCDate()) + '/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear());
                  this.bloodGlucoseList.push(result[objKey][i]);
                }
              }else{
                this.placeholderFlag = true;
              }
            }else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
                updateLoader.dismiss();
              }else{
                updateLoader.dismiss();
                this.navCtrl.push('InternetErrorPage');
              }
            };

          })
          updateLoader.dismiss();
        }else{
          if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
            updateLoader.dismiss();
          }else{
            updateLoader.dismiss();
            this.navCtrl.push('InternetErrorPage');
          }
        };

      })
    })
  }
  deleteBloodGlucose(id: number, index: number){
    this.bloodGlucoseService.deleteBloodGlucose(id,this.transplantTreatmentID,(result)=>{
      this.bloodGlucoseService.sendAlert(this.translation.TOAST_MESSAGE_DELETE,"success");
      console.log('Glicemia Deletada');
      this.bloodGlucoseList.splice(index,1);
      this.updateData();
      this.checkFade();

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
