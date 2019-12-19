import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrequencySelectPage } from './frequency-select';

@NgModule({
  declarations: [
    FrequencySelectPage,
  ],
  imports: [
    IonicPageModule.forChild(FrequencySelectPage),
    TranslateModule.forChild()
  ],
})
export class FrequencySelectPageModule {}
