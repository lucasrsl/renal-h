import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CiclosporinaPage } from './ciclosporina';

@NgModule({
  declarations: [
    CiclosporinaPage,
  ],
  imports: [
    IonicPageModule.forChild(CiclosporinaPage),
    TranslateModule.forChild()
  ],
})
export class CiclosporinaPageModule {}
