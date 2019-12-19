import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GlomerularFilterRatePage } from './glomerular-filter-rate';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GlomerularFilterRatePage,
  ],
  imports: [
    IonicPageModule.forChild(GlomerularFilterRatePage),
    TranslateModule.forChild()
  ]
})
export class GlomerularFilterRatePageModule {}
