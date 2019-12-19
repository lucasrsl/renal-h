import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TacrolimoPage } from './tacrolimo';

@NgModule({
  declarations: [
    TacrolimoPage,
  ],
  imports: [
    IonicPageModule.forChild(TacrolimoPage),
    TranslateModule.forChild()
  ],
})
export class TacrolimoPageModule {}
