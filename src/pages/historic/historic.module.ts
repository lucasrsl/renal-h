import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricPage } from './historic';
import { HistoricService } from './historic-service';

@NgModule({
  declarations: [
    HistoricPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricPage),
    TranslateModule.forChild()
  ],
  providers: [
    HistoricService
  ]
})
export class HistoricPageModule {}
