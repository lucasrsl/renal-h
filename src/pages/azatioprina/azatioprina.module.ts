import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AzatioprinaPage } from './azatioprina';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AzatioprinaPage,
  ],
  imports: [
    IonicPageModule.forChild(AzatioprinaPage),
    TranslateModule.forChild()
  ],
})
export class AzatioprinaPageModule {}
