import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrednisonaPage } from './prednisona';

@NgModule({
  declarations: [
    PrednisonaPage,
  ],
  imports: [
    IonicPageModule.forChild(PrednisonaPage),
    TranslateModule.forChild()
  ],
})
export class PrednisonaPageModule {}
