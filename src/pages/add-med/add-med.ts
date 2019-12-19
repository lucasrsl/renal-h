import { TranslateService } from '@ngx-translate/core';
import { Component, Renderer, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import {AddMedService} from './add-med.service';
import {BddStorage} from '../../providers/utils/bdd-storage';
import { LocalNotifications } from '@ionic-native/local-notifications';



@IonicPage()
@Component({
  selector: 'page-add-med',
  templateUrl: 'add-med.html',
})
export class AddMedPage {
  //checkboxInterval: boolean[] = [false,false];
  intervalSelected: string = "EM INTERVALOS";
  selectedPill: string = "ex: Comprimido";
  selectedFrequency: string = "4 em 4 horas";
  frequencyModified: boolean = false;
  pillName: string;
  medicationForm: FormGroup;
  intervalTime:any;
  frequency:any;
  bddLocal:BddStorage = new BddStorage();
  updateMed:boolean=false;
  alarmToggle: boolean = false;
  alarmType: string = 'Em intervalos';
  timeCoffe:any = {
    check:false,
    value:""
  };
  timeLunch:any = {
    check:false,
    value:""
  };
  timeDinner:any = {
    check:false,
    value:""
  };
  selectUnity:any = {
    title: 'Selecione uma unidade',
    mode: 'ios'
  };
  selectTime:any = {
    title: 'Selecione um intervalo',
    mode: 'ios'
  };
  translation: any;
  pillSelectTranslation: any;
  editing: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, public translate: TranslateService,
  private formBuilder: FormBuilder,public addMedService:AddMedService, public viewCtrl: ViewController, private localNotifications: LocalNotifications, private toastCtrl: ToastController, private loadingCtrl: LoadingController){
    this.translate.get("ADD_MED").subscribe((res)=>{
      this.translation = res;
      this.selectUnity.title = this.translation.SELECT_UNITY;
      this.selectTime.title = this.translation.SELECT_TIME;
      this.intervalSelected = this.translation.LABEL5.toUpperCase();
      this.alarmType = this.translation.LABEL5;
      this.selectedPill = this.translation.PLACEHOLDER;
    });
    this.translate.get("PILL_SELECT").subscribe((res)=>{
      this.pillSelectTranslation = res;
    })
    this.medicationForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        presentation_type: ['', [Validators.required]],
        dosage: ['', [Validators.required]],
        dosageQuantity:['',Validators.required],
        unityDose:["Mg",Validators.required]
    })
    let medParams = this.navParams.get('alarmMed');
    if(medParams){
      console.log(medParams);
      this.editing = true;
      this.medicationForm.controls['dosageQuantity'].setValue(medParams.dosageQuantity);
      this.medicationForm.controls['name'].setValue(medParams.name);
      this.medicationForm.controls['presentation_type'].setValue(medParams.presentation_type);
      this.medicationForm.controls['dosage'].setValue(medParams.dosage);
      this.alarmToggle = medParams.notification;
      this.selectedFrequency = medParams.frequency;
      if(medParams.alarms[0].trigger.every.minute >= 10){
        this.intervalTime = `${medParams.alarms[0].trigger.every.hour}:${medParams.alarms[0].trigger.every.minute}`;
      }else{
        this.intervalTime = `${medParams.alarms[0].trigger.every.hour}:0${medParams.alarms[0].trigger.every.minute}`;
      }
    }


  }
  /*verifyCheckbox(number: number){
    for(let i = 0; i<2; i++){
      if(this.checkboxInterval[number] == true){
        if(this.checkboxInterval[number] == this.checkboxInterval[i] && number - i !=0){
          this.checkboxInterval[i] = false;
        }
      }
    }
  }*/
  ionViewDidLoad(){
    let option2 = <HTMLElement> document.querySelector("#option-2");
    option2.hidden = true;
  }
  openPillSelect(){
    let pillSelect = this.modalCtrl.create('PillSelectPage',null,{enableBackdropDismiss: true, showBackdrop: true});
    pillSelect.onDidDismiss(data =>{
      console.log(data);
      if(data != null){
        let quantityInput = <HTMLInputElement>document.querySelector('input[name="quantity"]');
        let itemQuantity = document.querySelector('ion-item[display]');
        if(data == this.pillSelectTranslation.LABEL4){
          this.medicationForm.controls["dosage"].clearValidators();
          this.medicationForm.controls["dosage"].updateValueAndValidity();
          quantityInput.focus();
          quantityInput.blur();
          quantityInput.disabled = true;
          itemQuantity.setAttribute('display', 'disabled');
        }else{
          this.medicationForm.controls["dosage"].setValidators(Validators.required);
          this.medicationForm.controls["dosage"].updateValueAndValidity();
          quantityInput.focus();
          quantityInput.blur();
          quantityInput.disabled = false;
          itemQuantity.setAttribute('display', 'enabled');
        }
        this.selectedPill = data;

        this.medicationForm.controls['presentation_type'].setValue(data);
        let bottomBorderCorrection = <HTMLElement> document.getElementById('modal-input').firstElementChild;
        bottomBorderCorrection.focus();
        bottomBorderCorrection.blur();
        }
    });
    pillSelect.present();
  }
  openFrequencySelect(){
    let frequencySelect = this.modalCtrl.create('FrequencySelectPage',null,{enableBackdropDismiss: true, showBackdrop: true});
    frequencySelect.onDidDismiss(data =>{
      console.log(data);
      if(data != null){
        this.selectedFrequency = data;
        this.frequencyModified = true;
        }
    });
    frequencySelect.present();
  }
  postMedication(){
    let loading = this.loadingCtrl.create({
      content: this.translation.LOADING_MESSAGE
    });
    loading.present();
    if(this.medicationForm.valid && this.validateMed()){
      console.log(this.medicationForm.value);
      if(this.intervalSelected == this.translation.LABEL5.toUpperCase()){
        this.medicationForm.value.alarms_attributes = this.createTimerAlertInterval(this.intervalTime,this.selectedFrequency);
      }else if(this.intervalSelected == this.translation.LABEL6.toUpperCase()){
        this.medicationForm.value.alarms_attributes = this.createTimerAlertIntervalMeal();
      }
      let unityDose = this.medicationForm.value.unityDose;
      let dosageQuantity = this.medicationForm.value.dosageQuantity;
      delete this.medicationForm.value.unityDose;
      delete this.medicationForm.value.dosageQuantity;
      this.addMedService.postMedication(this.medicationForm.value,(result,err)=>{
        if(result){
          let alarms:any = [];
          for(let alarm of this.medicationForm.value.alarms_attributes){
            let hra = parseInt(alarm.time_alarm.split(":")[0]);
            let min = parseInt(alarm.time_alarm.split(":")[1]);
            // if(hra==0){
            //   hra = 24;
            // }
            //console.log('hora do alarme abaixo');
            //console.log(hra);
            let attr = {
              id: new Date().getTime(),
              title: this.translation.ALARM.TITLE,
              priority: 1,
              vibrate: false,
              sound: 'file://assets/audio/beep3.mp3',
              text: this.translation.ALARM.TEXT1 +this.medicationForm.value.name+" " + this.translation.ALARM.TEXT2 +" " + dosageQuantity + unityDose,
              trigger: { every: { hour: hra, minute: min }, count: 1}
            }
            alarms.push(attr);
          }
          this.localNotifications.schedule(alarms);
          let medicationAlarm:any = result;
          medicationAlarm.medication.frequency = this.frequency;
          medicationAlarm.medication.alarms = alarms;
          medicationAlarm.medication.unityDose = unityDose;
          medicationAlarm.medication.notification = this.alarmToggle;
          medicationAlarm.medication.dosageQuantity = dosageQuantity;
          if(medicationAlarm.medication.dosageQuantity > 1){
            if(medicationAlarm.medication.presentation_type == this.pillSelectTranslation.LABEL1 || medicationAlarm.medication.presentation_type =='Comprimido'){
              medicationAlarm.medication.presentation_type = medicationAlarm.medication.presentation_type + "s";
            }

          }
          this.bddLocal.addItem("medications",medicationAlarm.medication,()=>{
            this.viewCtrl.dismiss(true);
            if(this.editing){
              this.addMedService.sendAlert(this.translation.TOAST_MESSAGE_EDIT_SUCCESS,"success");
            }else{
              this.addMedService.sendAlert(this.translation.TOAST_MESSAGE_SUCCESS,"success");
            }
            loading.dismiss();
          });

          // this.navCtrl.pop();
        }else{
          if(err.status == 401){
            this.navCtrl.setRoot("LoginPage");
          }
          loading.dismiss();
          this.addMedService.sendAlert(this.translation.TOAST_MESSAGE_ERROR,"error");
        }
      });
    }else{
      let message;
      if(!this.medicationForm.controls['name'].valid){
        message = this.translation.ERROR.OPTION_1;
      }else if(!this.medicationForm.controls['presentation_type'].valid){
        message = this.translation.ERROR.OPTION_2;
      }else if(!this.medicationForm.controls['dosage'].valid && this.medicationForm.controls['presentation_type'].value !== this.pillSelectTranslation.LABEL4){
        message = this.translation.ERROR.OPTION_3;
      }else if(!this.medicationForm.controls['dosageQuantity'].valid){
        message = this.translation.ERROR.OPTION_4;
      }else if(!this.validateMed()){
        message = this.translation.ERROR.OPTION_5;
      }
      this.addMedService.sendAlert(message, "error");
      loading.dismiss();

    }




  }
  // createFrequency(){
  //   console.log(this.intervalTime);
  //   this.createTimerAlert(this.intervalTime,this.selectedFrequency);
  // }
  createTimerAlertIntervalMeal(){
    let arrayHourMin:any = [];
    if(this.timeCoffe.check && this.timeCoffe.value!=""){
      let time = this.timeCoffe.value.split(":");
      let hour = time[0];
      let min = time[1];
      arrayHourMin.push({h:hour,min:min});
    }if(this.timeLunch.check  && this.timeLunch.value!=""){
      let time = this.timeLunch.value.split(":");
      let hour = time[0];
      let min = time[1];
      arrayHourMin.push({h:hour,min:min});
    }if(this.timeDinner.check  && this.timeDinner.value!=""){
      let time = this.timeDinner.value.split(":");
      let hour = time[0];
      let min = time[1];
      arrayHourMin.push({h:hour,min:min});
    }
    let alarms_attributes:any = [];
    // for(let item of arrayHourMin){
    //   let hra:string ="";
    //   let min:string ="";
    //   if(item.h==0){
    //     hra = "00";
    //   }if(item.h<=9){
    //     hra = "0"+item.h;
    //   }
    //   if(item.h>9){
    //     hra = item.h;
    //   }
    //   if(item.min==0){
    //     min = "00";
    //   }if(item.min<=9){
    //     min = "0"+item.min;
    //   }
    //   if(item.min>9){
    //     min = item.min;
    //   }
    //   alarms_attributes.push({time_alarm:hra+":"+min});
    //   console.log("ALARME ATRIBUTOS MARILENE");
    //   console.log(alarms_attributes);
    // }
    for(let item of arrayHourMin){
      alarms_attributes.push({time_alarm: this.adjustTime(item)});
    }

    return alarms_attributes;
  }
  createTimerAlertInterval(hourMinute,interval){

    console.log("AQUI marilene OHH");
    //console.log(this.checkboxInterval);

    let arrayHourMin:any = [];
    this.frequency = interval;

    if(hourMinute){
      let time = hourMinute.split(":");
      var min = time[1];
      // let year = new Date().getFullYear();
      // let month = new Date().getMonth();
      // let day = new Date().getDate();
      // let reserv1 = new Date(year,month,day,"00",min);
      // console.log(reserv1);
      if(interval=="4 em 4 horas"){
        let hour = parseInt(time[0]);
        arrayHourMin.push({h:hour,min:min});
        for(let i=0; i<5; i++){
          hour = hour+4;
          if(hour>24){
            let aux = hour-24;
            hour = aux;
          }else if(hour==24){
            hour = 0;
          }
          arrayHourMin.push({h:hour,min:min});
        }
      }else if(interval=="6 em 6 horas"){
        let hour = parseInt(time[0]);
        arrayHourMin.push({h:hour,min:min});
        for(let i=0; i<3; i++){
          hour = hour+6;
          if(hour>24){
            console.log(hour);
            let aux = hour-24;
            hour = aux;
          }else if(hour==24){
            hour = 0;
          }
          arrayHourMin.push({h:hour,min:min});
        }
      }else if(interval=="8 em 8 horas"){
        let hour = parseInt(time[0]);
        arrayHourMin.push({h:hour,min:min});
        for(let i=0; i<2; i++){
          hour = hour+8;
          if(hour>24){
            let aux = hour-24;
            hour = aux;
          }else if(hour==24){
            hour = 0;
          }
          arrayHourMin.push({h:hour,min:min});
        }
      }else if(interval=="12 em 12 horas"){
        let hour = parseInt(time[0]);
        arrayHourMin.push({h:hour,min:min});
        for(let i=0; i<1; i++){
          hour = hour+12;
          if(hour>24){
            let aux = hour-24;
            hour = aux;
          }else if(hour==24){
            hour = 0;
          }
          arrayHourMin.push({h:hour,min:min});
        }
      }else if(interval=="1x ao dia"){
        var hour = parseInt(time[0]);
        arrayHourMin.push({h:hour,min:min});
      }
      let alarms_attributes:any = [];
      for(let item of arrayHourMin){
        alarms_attributes.push({time_alarm: this.adjustTime(item)});
      }
      console.log('teste');
      console.log(alarms_attributes);
      return alarms_attributes;
    }
  }
  selectAlarmType(event){
    let target = event.target;
    let text;
    if(target.tagName == "DIV"){
      text = target.innerText;
    }else{
      target = target.parentNode;
      text = target.innerText;
    };
    let option1 = <HTMLElement> document.querySelector("#option-1");
    let option2 = <HTMLElement> document.querySelector("#option-2");
    if(target.getAttribute('type') == 'not-active'){
      document.querySelector('.alarm-type[type="active"]').setAttribute('type','not-active');
      target.setAttribute('type','active');
      this.intervalSelected = text;
      console.log(text);
      if(text == this.translation.LABEL5.toUpperCase()){
        option1.hidden = false;
        option2.hidden = true;
      }else{
        option1.hidden = true;
        option2.hidden = false;
      }
    };
  }
  validateMed(): boolean{
    if(this.intervalSelected == this.translation.LABEL5.toUpperCase()){
      if(this.selectedFrequency == null || this.intervalTime == null){
        return false;
      }else{
        return true;
      }
    }else{
      let checkboxContent = [];
      let checkboxValidation = []
      checkboxContent.push(this.timeCoffe);
      checkboxContent.push(this.timeLunch);
      checkboxContent.push(this.timeDinner);
      if(checkboxContent[0].check || checkboxContent[1].check || checkboxContent[2].check){
        checkboxContent.forEach((element)=>{
          checkboxValidation.push(this.validateCheckbox(element));
        });
        return ((checkboxValidation[0] && checkboxValidation[1] && checkboxValidation[2]) ? true : false);
      }

    };
  }
  validateCheckbox(checkbox){
    if(checkbox.check){
      if(checkbox.value == null  || checkbox.value == ''){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }

  }
  // saveMedication(){
  //   this.navCtrl.pop();
  // }
  adjustTime(item){
    let time;
    if(item.h < 10){
      time = '0' + item.h+':' + item.min;
    }else{
      time = item.h+':' + item.min;
    }
    return time;
  }
}
