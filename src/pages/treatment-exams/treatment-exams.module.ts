import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreatmentExamsPage } from './treatment-exams';
import { TreatmentExamsService } from './treatment-exams-service';

@NgModule({
  declarations: [
    TreatmentExamsPage,
  ],
  imports: [
    IonicPageModule.forChild(TreatmentExamsPage),
    TranslateModule.forChild()
  ],
  providers: [
    TreatmentExamsService,
  ]
})
export class TreatmentExamsPageModule {}
