import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTreatmentExamPage } from './add-treatment-exam';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddTreatmentExamPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTreatmentExamPage),
    TranslateModule.forChild()
  ],
})
export class AddTreatmentExamPageModule {}
