import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransplantedDoubtsPage } from './transplanted-doubts';

@NgModule({
  declarations: [
    TransplantedDoubtsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransplantedDoubtsPage),
    TranslateModule.forChild()
  ],
})
export class TransplantedDoubtsPageModule {}
