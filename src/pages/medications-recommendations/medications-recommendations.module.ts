import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicationsRecommendationsPage } from './medications-recommendations';

@NgModule({
  declarations: [
    MedicationsRecommendationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicationsRecommendationsPage),
    TranslateModule.forChild()
  ],
})
export class MedicationsRecommendationsPageModule {}
