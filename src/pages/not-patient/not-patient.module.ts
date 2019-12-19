import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotPatientPage } from './not-patient';

@NgModule({
  declarations: [
    NotPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(NotPatientPage),
    TranslateModule.forChild()
  ],
})
export class NotPatientPageModule {}
