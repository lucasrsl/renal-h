import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CupSelectPage } from './cup-select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CupSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(CupSelectPage),
    TranslateModule.forChild()
  ],
})
export class CupSelectPageModule {}
