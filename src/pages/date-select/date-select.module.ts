import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateSelectPage } from './date-select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DateSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(DateSelectPage),
    TranslateModule.forChild()
  ],
})
export class DateSelectPageModule {}
