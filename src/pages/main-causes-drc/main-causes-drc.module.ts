import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainCausesDrcPage } from './main-causes-drc';

@NgModule({
  declarations: [
    MainCausesDrcPage,
  ],
  imports: [
    IonicPageModule.forChild(MainCausesDrcPage),
    TranslateModule.forChild()
  ],
})
export class MainCausesDrcPageModule {}
