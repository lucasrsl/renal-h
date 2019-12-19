import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignalsAndSymptonsPage } from './signals-and-symptons';

@NgModule({
  declarations: [
    SignalsAndSymptonsPage,
  ],
  imports: [
    IonicPageModule.forChild(SignalsAndSymptonsPage),
    TranslateModule.forChild()
  ],
})
export class SignalsAndSymptonsPageModule {}
