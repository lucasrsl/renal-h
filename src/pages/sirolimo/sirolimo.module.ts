import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SirolimoPage } from './sirolimo';

@NgModule({
  declarations: [
    SirolimoPage,
  ],
  imports: [
    IonicPageModule.forChild(SirolimoPage),
    TranslateModule.forChild()
  ],
})
export class SirolimoPageModule {}
