import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectTreatmentPage } from './select-treatment';
import { SelectTreatmentService } from './select-treatment.service';

@NgModule({
  declarations: [
    SelectTreatmentPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectTreatmentPage),
    TranslateModule.forChild()
  ],
  providers: [
    SelectTreatmentService
  ]
})
export class SelectTreatmentPageModule {}
