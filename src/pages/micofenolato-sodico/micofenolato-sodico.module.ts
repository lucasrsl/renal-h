import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MicofenolatoSodicoPage } from './micofenolato-sodico';

@NgModule({
  declarations: [
    MicofenolatoSodicoPage,
  ],
  imports: [
    IonicPageModule.forChild(MicofenolatoSodicoPage),
    TranslateModule.forChild()
  ],
})
export class MicofenolatoSodicoPageModule {}
