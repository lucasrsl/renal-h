import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformationTransplantedPage } from './information-transplanted';

@NgModule({
  declarations: [
    InformationTransplantedPage,
  ],
  imports: [
    IonicPageModule.forChild(InformationTransplantedPage),
    TranslateModule.forChild()
  ],
})
export class InformationTransplantedPageModule {}
