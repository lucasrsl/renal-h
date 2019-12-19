import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransplantedNutritionalRecommendationPage } from './transplanted-nutritional-recommendation';

@NgModule({
  declarations: [
    TransplantedNutritionalRecommendationPage,
  ],
  imports: [
    IonicPageModule.forChild(TransplantedNutritionalRecommendationPage),
    TranslateModule.forChild()
  ],
})
export class TransplantedNutritionalRecommendationPageModule {}
