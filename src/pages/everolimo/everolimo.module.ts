import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EverolimoPage } from './everolimo';

@NgModule({
  declarations: [
    EverolimoPage,
  ],
  imports: [
    IonicPageModule.forChild(EverolimoPage),
    TranslateModule.forChild()
  ],
})
export class EverolimoPageModule {}
