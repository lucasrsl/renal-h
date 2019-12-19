import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTransplantedWeightPage } from './add-transplanted-weight';
import { TranslateModule } from '@ngx-translate/core';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    AddTransplantedWeightPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(AddTransplantedWeightPage),
    TranslateModule.forChild()
  ],
})
export class AddTransplantedWeightPageModule {}
