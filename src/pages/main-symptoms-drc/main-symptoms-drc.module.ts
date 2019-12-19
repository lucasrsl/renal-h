import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainSymptomsDrcPage } from './main-symptoms-drc';

@NgModule({
  declarations: [
    MainSymptomsDrcPage,
  ],
  imports: [
    IonicPageModule.forChild(MainSymptomsDrcPage),
    TranslateModule.forChild()
  ],
})
export class MainSymptomsDrcPageModule {}
