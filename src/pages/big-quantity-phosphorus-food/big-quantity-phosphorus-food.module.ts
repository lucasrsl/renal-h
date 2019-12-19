import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BigQuantityPhosphorusFoodPage } from './big-quantity-phosphorus-food';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BigQuantityPhosphorusFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(BigQuantityPhosphorusFoodPage),
    TranslateModule.forChild()
  ],
})
export class BigQuantityPhosphorusFoodPageModule {}
