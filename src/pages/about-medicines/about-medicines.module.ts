import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutMedicinesPage } from './about-medicines';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AboutMedicinesPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutMedicinesPage),
    TranslateModule.forChild()
  ],
})
export class AboutMedicinesPageModule {}
