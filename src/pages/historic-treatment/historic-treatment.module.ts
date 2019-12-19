import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricTreatmentPage } from './historic-treatment';
import { HistoricTreatmentService } from './historic-treatment-service';

@NgModule({
  declarations: [
    HistoricTreatmentPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricTreatmentPage),
    TranslateModule.forChild()
  ],
  providers:[
    HistoricTreatmentService,
  ]
})
export class HistoricTreatmentPageModule {}
