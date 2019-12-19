import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LowMediumAmountsPotassiumFoodsPage } from './low-medium-amounts-potassium-foods';

@NgModule({
  declarations: [
    LowMediumAmountsPotassiumFoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(LowMediumAmountsPotassiumFoodsPage),
    TranslateModule.forChild()
  ],
})
export class LowMediumAmountsPotassiumFoodsPageModule {}
