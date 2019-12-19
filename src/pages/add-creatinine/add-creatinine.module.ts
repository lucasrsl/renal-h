import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCreatininePage } from './add-creatinine';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddCreatininePage,
  ],
  imports: [
    IonicPageModule.forChild(AddCreatininePage),
    TranslateModule.forChild()
  ],
})
export class AddCreatininePageModule {}
