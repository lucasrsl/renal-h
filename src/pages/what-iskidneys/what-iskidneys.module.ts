import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatIskidneysPage } from './what-iskidneys';

@NgModule({
  declarations: [
    WhatIskidneysPage,
  ],
  imports: [
    IonicPageModule.forChild(WhatIskidneysPage),
    TranslateModule.forChild()
  ],
})
export class WhatIskidneysPageModule {}
