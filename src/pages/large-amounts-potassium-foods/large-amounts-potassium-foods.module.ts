import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LargeAmountsPotassiumFoodsPage } from './large-amounts-potassium-foods';

@NgModule({
  declarations: [
    LargeAmountsPotassiumFoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(LargeAmountsPotassiumFoodsPage),
    TranslateModule.forChild()
  ],
})
export class LargeAmountsPotassiumFoodsPageModule {}
