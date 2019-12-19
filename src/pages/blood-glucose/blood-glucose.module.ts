import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodGlucosePage } from './blood-glucose';
import { BloodGlucoseService } from './blood-glucose-service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BloodGlucosePage,
  ],
  imports: [
    IonicPageModule.forChild(BloodGlucosePage),
    TranslateModule.forChild()
  ],
  providers: [
    BloodGlucoseService
  ]
})
export class BloodGlucosePageModule {}
