import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HistoricWeightService } from './historic-weight-service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the HistoricWeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historic-weight',
  templateUrl: 'historic-weight.html',
})
export class HistoricWeightPage {
  placeholderFlag: boolean = true;
  fade: any;
  scrollContentHeight: number;
  weight: any[] = [];
  hemodialysisTreatmentId: number;
  listHeight: number;
  translation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public historicWeightService: HistoricWeightService, public storage: Storage, public loadingCtrl: LoadingController, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("HISTORIC_WEIGHT").subscribe((res)=>{
      this.translation = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricWeightPage');
    this.fade = document.getElementsByClassName('fade').item(0);
    this.scrollContentHeight = document.getElementsByClassName('scroll-content').item(1).clientHeight;
    this.listHeight = document.getElementById('list').clientHeight;
  }
  ionViewDidEnter(){
    this.checkFade();
  }
  ionViewWillEnter(){
    this.checkWeight();
  }
  openPage(page) {
    this.navCtrl.push(page);
  }
  scroll(teste: any){

    //console.log((teste.scrollTop + window.innerHeight - 70) +' '+ document.getElementById('list').clientHeight);
    if(teste.scrollTop + window.innerHeight - 70 >= this.listHeight){
      this.fade.setAttribute('display','false');
    }
    else{
      this.fade.setAttribute('display','true');
    }
  }
  checkFade(){
    this.listHeight = document.getElementById('list').clientHeight;
    setTimeout(() => {
      if(this.scrollContentHeight <= document.getElementById('list').clientHeight){
        this.fade.setAttribute('display','true');
      }
      else{
        this.fade.setAttribute('display','false');
      }
    }, 10);

  }
  checkWeight(){
    let updateLoader = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE,
    })
    updateLoader.present();
    this.storage.get('usr').then((usr)=>{
      this.historicWeightService.getHemodialysisTreatment(usr,(result,err?)=>{
        if(result){
          this.hemodialysisTreatmentId = result.hemodialysis_treatments.pop().id;
          this.historicWeightService.getDialysisSessions(this.hemodialysisTreatmentId,(result,err?)=>{
            if(result){
              this.weight = [];
              let dialysis = result.dialysis_sessions;
              if(dialysis.length > 0){
                this.placeholderFlag = false;
              }
              for(let i = 0; i < dialysis.length; i++){
                this.weight.push(dialysis[i]);
              }
              updateLoader.dismiss();
              this.checkFade();

            }
            else{
              if(err.status == 401){
                this.navCtrl.setRoot("LoginPage");
                updateLoader.dismiss();
              }else{
                this.navCtrl.push('InternetErrorPage');
                updateLoader.dismiss();
              }
            }
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
