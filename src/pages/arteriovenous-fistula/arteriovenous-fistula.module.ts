import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArteriovenousFistulaPage } from './arteriovenous-fistula';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ArteriovenousFistulaPage,
  ],
  imports: [
    IonicPageModule.forChild(ArteriovenousFistulaPage),
    TranslateModule.forChild()
  ],
})
export class ArteriovenousFistulaPageModule {}
