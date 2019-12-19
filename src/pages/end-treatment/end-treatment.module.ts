import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndTreatmentPage } from './end-treatment';
import { EndTreatmentService } from './end-treatment-service';

@NgModule({
  declarations: [
    EndTreatmentPage,
  ],
  imports: [
    IonicPageModule.forChild(EndTreatmentPage),
    TranslateModule.forChild()
  ],
  providers: [
    EndTreatmentService,
  ]
})
export class EndTreatmentPageModule {}
