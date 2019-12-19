import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-app.scss',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = '';
  pages: string;
  activeMenu:boolean = false;
  userType: number;
  pageVerify: boolean = false;
  internet: boolean = true;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  public translate: TranslateService, public storage:Storage,public events: Events){
    this.verifySession();
    this.initializeApp();
    this.translate.addLangs(['en', 'es','pt']);
    if(localStorage.getItem("language")){
      this.changeLanguage(parseInt(localStorage.getItem("language")));
    };

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt/) ? browserLang : 'pt');


    this.events.subscribe('activeMenu', (result) => {
      this.activeMenu = result;
    });
    this.events.subscribe('verifyUserType',(result)=>{
      this.userType = result;
    });
    this.events.subscribe('verifyPage',(result)=>{
      this.pageVerify = result;
    });
    this.events.subscribe('changeLanguage',(result)=>{
      console.log(result);
      this.changeLanguage(parseInt(result));
    });
    this.events.subscribe('changeInternetStatus',(result)=>{
      this.internet = result;
      if(result){
        let buttons = document.getElementsByClassName('internet-required-button');
        for(let i = 0; i< buttons.length; i++){
          let temp = <HTMLInputElement> buttons[i];
          temp.disabled = false;
        }
        /*teste.forEach((element)=>{
          console.log(element);
          element.removeAttribute('disabled');
          element.setAttributeNode(enabled);
        });*/
      }else{
        let buttons = document.getElementsByClassName('internet-required-button');
        for(let i = 0; i< buttons.length; i++){
          let temp = <HTMLInputElement> buttons[i];
          temp.disabled = true;
        }
        /*teste.forEach((element) => {
          console.log(element);
          element.removeAttribute('enabled');
          element.setAttributeNode(disabled);
        });*/
      }
    });


  }
  ngAfterViewInit(){
    if(this.platform.is('ios')){
      this.adjustModalIos('menu-inner');
    };
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
  verifySession(){
    //this.storage.get('term').then((data)=>{
      //if(data !== null){
        this.storage.get('auth').then(
          (data) => {
            console.log('autenticação abaixo');
            console.log(data);
            if(data){
              this.storage.get('usr').then((usr)=>{
                this.userType = usr.user_type;
                if(this.userType == 1){
                  this.nav.setRoot('HowAreYouTodayPage');
                }
                else if(this.userType == 2 || this.userType == 3){
                  this.nav.setRoot('TodaySchedulePage');
                }
                else{
                  this.nav.setRoot('LoginPage');
                }
              })

            }else{
              this.nav.setRoot('LoginPage');
            };
          },
          (error) => {
            console.error(error);
          }
        );
      //}else{
        //this.nav.setRoot('ServiceTermPage');
      //};

    //});


  }
  // ionViewWillEnter() {
  //   this.menu.enable(false);
  // }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(this.platform.is('ios')){
        this.statusBar.styleDefault();
      }else{
        this.statusBar.styleBlackOpaque();
      }


      this.splashScreen.hide();
    });
  }
  openPage(page, param?) {
    this.nav.setRoot(page);
    if(param){
      this.nav.setRoot(page,param);
    };
  }
  openPageProfile(){
    if(this.pageVerify == false){
      this.nav.setRoot('ProfilePage');
    }
    else{
      this.nav.dismissPageChangeViews();
    }
  }
  logout(){
    this.storage.remove('auth').then(
      (data) => {
        console.log(data);
        this.activeMenu = false;
        this.nav.setRoot('LoginPage');
      },
      (error) => {
        console.error(error);
      }
    );

  }
  adjustModalIos(page: string){
    let elementArray = document.getElementsByTagName(`ion-menu`)[0].getElementsByClassName('statusbar-padding');
    let lenghtArray = elementArray.length;
    for(let i = 0; i < lenghtArray; i++){
      if(elementArray[0].tagName == 'ION-TOOLBAR'){
        elementArray[0].className = 'toolbar toolbar-ios';
      }else{
        elementArray[0].className = 'content content-ios';
      };
    };
  }
}
