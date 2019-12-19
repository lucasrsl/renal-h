import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransplantedWeightPage } from './transplanted-weight';
import { TransplantedWeightService } from './transplanted-weight-service';

@NgModule({
  declarations: [
    TransplantedWeightPage,
  ],
  imports: [
    IonicPageModule.forChild(TransplantedWeightPage),
    TranslateModule.forChild()
  ],
  providers:[
    TransplantedWeightService
  ]
})
export class TransplantedWeightPageModule {}
