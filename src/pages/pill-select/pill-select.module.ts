import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PillSelectPage } from './pill-select';

@NgModule({
  declarations: [
    PillSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(PillSelectPage),
    TranslateModule.forChild()
  ],
})
export class PillSelectPageModule {}
