import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransplantedGeralRecommendationPage } from './transplanted-geral-recommendation';

@NgModule({
  declarations: [
    TransplantedGeralRecommendationPage,
  ],
  imports: [
    IonicPageModule.forChild(TransplantedGeralRecommendationPage),
    TranslateModule.forChild()
  ],
})
export class TransplantedGeralRecommendationPageModule {}
