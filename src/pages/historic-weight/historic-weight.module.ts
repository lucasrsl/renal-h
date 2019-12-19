import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricWeightPage } from './historic-weight';
import { HistoricWeightService } from './historic-weight-service';

@NgModule({
  declarations: [
    HistoricWeightPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricWeightPage),
    TranslateModule.forChild()
  ],
  providers: [
    HistoricWeightService
  ]
})
export class HistoricWeightPageModule {}
