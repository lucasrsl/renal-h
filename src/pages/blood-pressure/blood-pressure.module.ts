import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodPressurePage } from './blood-pressure';
import { BloodPressureService } from './blood-pressure-service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BloodPressurePage,
  ],
  imports: [
    IonicPageModule.forChild(BloodPressurePage),
    TranslateModule.forChild()
  ],
  providers: [
    BloodPressureService
  ]
})
export class BloodPressurePageModule {}
