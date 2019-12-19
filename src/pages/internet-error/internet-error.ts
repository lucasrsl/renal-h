import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { InternetErrorService } from './internet-error-service';


/**
 * Generated class for the InternetErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-internet-error',
  templateUrl: 'internet-error.html',
})
export class InternetErrorPage {
  hideSideMenu: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public internetErrorService: InternetErrorService, public events: Events, public menuCtrl: MenuController, private translate: TranslateService) {
    //this.navParams.get('hideSideMenu') == undefined ? this.hideSideMenu = false : this.hideSideMenu = true;
    this.hideSideMenu = this.navParams.get('hideSideMenu');
    //this.hideSideMenu = !this.hideSideMenu;
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };
  }

  ionViewDidLoad() {

    if(this.hideSideMenu){
      document.getElementById('menu-button').setAttribute('disabled', 'true');
    }else{
      document.getElementById('menu-button').removeAttribute('disabled');
    }
  }
  ionViewDidEnter(){
    if(!this.internetErrorService.getCheckingInternet()){
      this.events.publish("changeInternetStatus", false);
      this.internetErrorService.setCheckingInternet(true);
      this.internetErrorService.checkInternet(()=>{
        this.events.publish("changeInternetStatus", true);
        this.internetErrorService.setCheckingInternet(false);
      });
    }

  }
  setRootPage(page){
    this.navCtrl.setRoot(page);
  }
  tryAgain(){
    this.navCtrl.pop();
  }
  openMenu(){
    this.menuCtrl.open();
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
