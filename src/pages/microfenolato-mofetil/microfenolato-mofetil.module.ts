import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MicrofenolatoMofetilPage } from './microfenolato-mofetil';

@NgModule({
  declarations: [
    MicrofenolatoMofetilPage,
  ],
  imports: [
    IonicPageModule.forChild(MicrofenolatoMofetilPage),
    TranslateModule.forChild()
  ],
})
export class MicrofenolatoMofetilPageModule {}
