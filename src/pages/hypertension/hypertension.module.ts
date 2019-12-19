import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HypertensionPage } from './hypertension';

@NgModule({
  declarations: [
    HypertensionPage,
  ],
  imports: [
    IonicPageModule.forChild(HypertensionPage),
    TranslateModule.forChild()
  ],
})
export class HypertensionPageModule {}
