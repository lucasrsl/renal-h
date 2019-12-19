import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LiquidControllerService } from './liquid-controller-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the TreatmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liquid-controller',
  templateUrl: 'liquid-controller.html',
})
export class LiquidControllerPage {
  dailyVolumeMax: number = 1000;
  dailyVolume: number = 1000;
  dailyVolumeProgress: number = 0;
  cupNumber: number = 5;
  historic: any[] = [];
  historicAtribute:{
    text: string;
    hora: string;
    icon: string;
  }
  hemodialysisTreatmentID: number;
  totalLiquid: number = 0;
  placeholderFlag: boolean = true;
  textStatus: string = "Você ainda pode beber hoje";
  textLiquid: string;
  fade: any;
  scrollContentHeight: number;
  listHeight: number;
  tranlation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  public modalCtrl: ModalController, public storage: Storage, public liquidControllerService: LiquidControllerService,public loadingCtrl: LoadingController, private translate: TranslateService) {
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
    this.translate.get("LIQUID_CONTROLLER").subscribe((res)=>{
      this.tranlation = res;
    });
    let updateLoader = this.loadingCtrl.create({
      content: this.tranlation.LOADING_MESSAGE
    });
    updateLoader.present();
    this.storage.get('usr').then((usr)=>{
      this.liquidControllerService.getHemodialysisTreatment(usr, (result,err?)=>{
        if(result){

          let hemodialysisTreatment = result.hemodialysis_treatments.pop();
          this.dailyVolumeMax = hemodialysisTreatment.current_water_limit;
          this.dailyVolume = hemodialysisTreatment.current_water_limit;
          this.cupNumber = this.checkCupNumbers(hemodialysisTreatment.current_water_limit);
          this.hemodialysisTreatmentID = hemodialysisTreatment.id;
          this.liquidControllerService.getDrinkAmout(hemodialysisTreatment.id,(result,err?)=>{
            if(result){
              if(result.drink_amounts.length > 0){
                this.placeholderFlag = false;
              }
              console.log(result);
              for(let i = 0; i < result.drink_amounts.length; i++){
                this.dailyVolumeProgress = (this.dailyVolumeProgress + this.transformValueToPercentage(result.drink_amounts[i].amount));
                this.dailyVolume = this.dailyVolume - result.drink_amounts[i].amount;
                this.totalLiquid = this.totalLiquid + result.drink_amounts[i].amount;
                this.cupNumber = this.checkCupNumbers(this.dailyVolume);
                this.addHistoric(result.drink_amounts[i]);


              }
              this.checkFade();
              this.verifyBarColor();
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


          });


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
    },(err)=>{
      console.log(err);
    });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiquidControllerPage');
    this.fade = document.getElementsByClassName('fade').item(0);
    this.scrollContentHeight = document.getElementsByClassName('scroll-content').item(1).clientHeight;
    this.listHeight = document.getElementById('list').clientHeight + document.getElementById('hud').clientHeight + 20;
    document.getElementById('add-cup').style.marginTop = (this.scrollContentHeight - 65) + 'px'
  };
  ionViewDidEnter(){
    this.checkFade();
  }
  changeDailyVolume() {
    let updateLoader = this.loadingCtrl.create({
      content: this.tranlation.LOADING_MESSAGE
    });
    const changeVolume = this.alertCtrl.create({
      title: this.tranlation.ALERT.TITLE,
      subTitle: this.tranlation.ALERT.TITLE2,
      cssClass: 'liquid-limit-class',
      inputs: [
        {
          name: 'selectedVolume',
          placeholder: this.tranlation.ALERT.INPUT_PLACEHOLDER,
          type: 'number'
        },
      ],
      buttons: [
        {
          text: this.tranlation.ALERT.BUTTONS.CANCEL,
          role: 'cancel'
        },
        {
          text: this.tranlation.ALERT.BUTTONS.SELECT,
          handler: data => {
            if(data.selectedVolume != null && data.selectedVolume != ''){
              let obj = {
                hemodialysis_treatment: {
                  current_water_limit: data.selectedVolume
                }
              }
              updateLoader.present();
              this.liquidControllerService.putHemodialysisTreatment(obj,this.hemodialysisTreatmentID,(result,err?)=>{
                if(result){
                  this.liquidControllerService.sendAlert(this.tranlation.TOAST_MESSAGE_LIMIT_CHANGE,"success");
                  let hemodialysisTreatment = result.hemodialysis_treatment;
                  this.dailyVolumeMax = hemodialysisTreatment.current_water_limit;
                  this.dailyVolume = hemodialysisTreatment.current_water_limit;
                  this.cupNumber = this.checkCupNumbers(hemodialysisTreatment.current_water_limit);
                  this.dailyVolumeProgress = 0;
                  this.liquidControllerService.getDrinkAmout(hemodialysisTreatment.id,(result,err?)=>{
                  if(result){
                    console.log(result);

                    for(let i = 0; i < result.drink_amounts.length; i++){
                      this.dailyVolumeProgress = (this.dailyVolumeProgress + this.transformValueToPercentage(result.drink_amounts[i].amount));
                      this.dailyVolume = this.dailyVolume - result.drink_amounts[i].amount;

                      this.cupNumber = this.checkCupNumbers(this.dailyVolume);


                    }
                    this.checkFade();
                    this.verifyBarColor();
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

                }else{
                  if(err.status == 401){
                    this.navCtrl.setRoot("LoginPage");
                    updateLoader.dismiss();
                  }else{
                    this.navCtrl.push('InternetErrorPage');
                    updateLoader.dismiss();
                  }
                };
                updateLoader.dismiss();
              });
            }
          }
        }
      ]
    });
    changeVolume.present();
  };
  transformValueToPercentage(value: number): number{
    let onePercent: number;
    let percentage: number;
    onePercent = (this.dailyVolumeMax/100);
    percentage = (value / onePercent);
    return percentage;
  };
  checkCupNumbers(volume: number): number{
     return (volume/200);

  };
  addHistoric(list: any){
    let value = list.amount;
    let time = this.adjustTime(list);

    if(value == 200){
      this.historicAtribute = {
        text: this.tranlation.OPTIONS.OPTION1,
        hora: time,
        icon: '../assets/imgs/copinho-1.2.png'
      };
    }
    else if(value == 150){
      this.historicAtribute = {
        text: this.tranlation.OPTIONS.OPTION2,
        hora: time,
        icon: "../assets/imgs/copinho-2.2.png"
      };
    }
    else if(value == 100){
      this.historicAtribute = {
        text: this.tranlation.OPTIONS.OPTION3,
        hora: time,
        icon: '../assets/imgs/copinho-3.2.png'
      };
    }
    else if(value == 50){
      this.historicAtribute = {
        text: this.tranlation.OPTIONS.OPTION4,
        hora: time,
        icon: '../assets/imgs/copinho-4.2.png'
      };
    };
    this.historic.push(this.historicAtribute);
  }
  openCupSelect(){
    let updateLoader = this.loadingCtrl.create({
      content: this.tranlation.LOADING_MESSAGE
    });
    let cupSelect = this.modalCtrl.create('CupSelectPage',null,{showBackdrop:true, enableBackdropDismiss:true});
    cupSelect.onDidDismiss(data =>{
      console.log(data);
      if(data != null){
        updateLoader.present();
        let drink_amount ={
          amount: data
        };
        console.log(drink_amount);
        this.liquidControllerService.postDrinkAmount(drink_amount,this.hemodialysisTreatmentID,(result,err?)=>{
          if(result){
            this.liquidControllerService.sendAlert(this.tranlation.TOAST_MESSAGE_CUP_ADD,"success");
            console.log(result);
            this.dailyVolumeProgress = (this.dailyVolumeProgress + this.transformValueToPercentage(data));
            this.dailyVolume = (this.dailyVolume - data);
            this.totalLiquid = this.totalLiquid + data;
            this.cupNumber = this.checkCupNumbers(this.dailyVolume);
            this.addHistoric(result.drink_amount);
            this.placeholderFlag = false;
            this.checkFade();
            this.verifyBarColor();
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

      }

    });
    cupSelect.present();
  }
  openCup(){
    this.navCtrl.push('CupSelectPage');
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
  openInformation(){
    let information = this.alertCtrl.create({
      title: this.tranlation.ALERT2.TITLE,
      cssClass: 'alert-class',
      message: this.tranlation.ALERT2.MESSAGE,
      buttons: [this.tranlation.ALERT2.BUTTON]
    })
    information.present();
  }
  verifyBarColor(){
    if(this.dailyVolume < 0){
      document.getElementsByClassName('progress-inside').namedItem('inside-bar').setAttribute('data-color','red');
      this.dailyVolume = 0;
      this.cupNumber = 0;
      this.textStatus = this.tranlation.STATUS.OPTION4;
      this.textLiquid = "";
    }else if(this.dailyVolume > (this.dailyVolumeMax * 0.2)){
      document.getElementsByClassName('progress-inside').namedItem('inside-bar').setAttribute('data-color','green');
      this.textStatus = this.tranlation.STATUS.OPTION1
      this.textLiquid = (Math.round(this.cupNumber*10)/10) + " "+ this.tranlation.STATUS.VOLUME +"(" + this.dailyVolume + " ml)";
    }else if(this.dailyVolume == 0){
      document.getElementsByClassName('progress-inside').namedItem('inside-bar').setAttribute('data-color','red');
      this.cupNumber = 0;
      this.textStatus = this.tranlation.STATUS.OPTION3;
      this.textLiquid = "";
    }else{
      document.getElementsByClassName('progress-inside').namedItem('inside-bar').setAttribute('data-color','yellow');
      this.textStatus = this.tranlation.STATUS.OPTION2;
      this.textLiquid = (Math.round(this.cupNumber*10)/10) + " "+ this.tranlation.STATUS.VOLUME +"(" + this.dailyVolume + " ml)";
    };
  }
  scroll(teste: any){

    //console.log(teste.scrollTop + window.innerHeight - 70 +' '+ (document.getElementById('list').clientHeight + document.getElementById('hud').clientHeight));
    if(teste.scrollTop + window.innerHeight - 90 >= this.listHeight){
      this.fade.setAttribute('display','false');
    }
    else{
      this.fade.setAttribute('display','true');
    }
  }
  checkFade(){
    this.listHeight = document.getElementById('list').clientHeight + document.getElementById('hud').clientHeight + 20;
    console.log(this.listHeight);
    console.log(this.scrollContentHeight);
    setTimeout(() => {
      if(this.scrollContentHeight <= document.getElementById('list').clientHeight + document.getElementById('hud').clientHeight + 20){
        this.fade.setAttribute('display','true');
      }
      else{
        this.fade.setAttribute('display','false');
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
}
