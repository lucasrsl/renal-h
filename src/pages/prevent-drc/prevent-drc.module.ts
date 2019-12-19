import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreventDrcPage } from './prevent-drc';

@NgModule({
  declarations: [
    PreventDrcPage,
  ],
  imports: [
    IonicPageModule.forChild(PreventDrcPage),
    TranslateModule.forChild()
  ],
})
export class PreventDrcPageModule {}
