import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraftPage } from './graft';

@NgModule({
  declarations: [
    GraftPage,
  ],
  imports: [
    IonicPageModule.forChild(GraftPage),
    TranslateModule.forChild()
  ],
})
export class GraftPageModule {}
