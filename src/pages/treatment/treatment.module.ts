import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreatmentPage } from './treatment';
import { TreatmentService } from './treatment-service';

@NgModule({
  declarations: [
    TreatmentPage,
  ],
  imports: [
    IonicPageModule.forChild(TreatmentPage),
    TranslateModule.forChild()
  ],
  providers: [
    TreatmentService
  ]
})
export class TreatmentPageModule {}
