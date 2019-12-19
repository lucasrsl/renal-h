import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShortStayCatheterPage } from './short-stay-catheter';

@NgModule({
  declarations: [
    ShortStayCatheterPage,
  ],
  imports: [
    IonicPageModule.forChild(ShortStayCatheterPage),
    TranslateModule.forChild()
  ],
})
export class ShortStayCatheterPageModule {}
