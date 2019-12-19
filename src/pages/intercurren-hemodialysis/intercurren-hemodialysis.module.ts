import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntercurrenHemodialysisPage } from './intercurren-hemodialysis';

@NgModule({
  declarations: [
    IntercurrenHemodialysisPage,
  ],
  imports: [
    IonicPageModule.forChild(IntercurrenHemodialysisPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class IntercurrenHemodialysisPageModule {}
