import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBloodGlucosePage } from './add-blood-glucose';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddBloodGlucosePage,
  ],
  imports: [
    IonicPageModule.forChild(AddBloodGlucosePage),
    TranslateModule.forChild()
  ],
})
export class AddBloodGlucosePageModule {}
