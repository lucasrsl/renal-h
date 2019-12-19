import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeightControlPage } from './weight-control';
import { WeightControlService } from './weight-control-service';

@NgModule({
  declarations: [
    WeightControlPage,
  ],
  imports: [
    IonicPageModule.forChild(WeightControlPage),
    TranslateModule.forChild()
  ],
  providers: [
    WeightControlService
  ]
})
export class WeightControlPageModule {}
