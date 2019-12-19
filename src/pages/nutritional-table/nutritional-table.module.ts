import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NutritionalTablePage } from './nutritional-table';

@NgModule({
  declarations: [
    NutritionalTablePage,
  ],
  imports: [
    IonicPageModule.forChild(NutritionalTablePage),
    TranslateModule.forChild()
  ],
})
export class NutritionalTablePageModule {}
