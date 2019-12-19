import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBloodPressurePage } from './add-blood-pressure';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddBloodPressurePage,
  ],
  imports: [
    IonicPageModule.forChild(AddBloodPressurePage),
    TranslateModule.forChild()
  ],
})
export class AddBloodPressurePageModule {}
