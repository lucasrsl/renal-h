import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediumQuantityPhosphorusFoodPage } from './medium-quantity-phosphorus-food';

@NgModule({
  declarations: [
    MediumQuantityPhosphorusFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(MediumQuantityPhosphorusFoodPage),
    TranslateModule.forChild()
  ],
})
export class MediumQuantityPhosphorusFoodPageModule {}
