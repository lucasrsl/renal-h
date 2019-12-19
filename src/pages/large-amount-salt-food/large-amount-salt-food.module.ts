import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LargeAmountSaltFoodPage } from './large-amount-salt-food';

@NgModule({
  declarations: [
    LargeAmountSaltFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(LargeAmountSaltFoodPage),
    TranslateModule.forChild()
  ],
})
export class LargeAmountSaltFoodPageModule {}
