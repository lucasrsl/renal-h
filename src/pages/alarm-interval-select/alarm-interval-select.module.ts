import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlarmIntervalSelectPage } from './alarm-interval-select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AlarmIntervalSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(AlarmIntervalSelectPage),
    TranslateModule.forChild()
  ],
})
export class AlarmIntervalSelectPageModule {}
