import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreatmentDrcPage } from './treatment-drc';

@NgModule({
  declarations: [
    TreatmentDrcPage,
  ],
  imports: [
    IonicPageModule.forChild(TreatmentDrcPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class TreatmentDrcPageModule {}
