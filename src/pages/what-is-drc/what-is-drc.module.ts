import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatIsDrcPage } from './what-is-drc';

@NgModule({
  declarations: [
    WhatIsDrcPage,
  ],
  imports: [
    IonicPageModule.forChild(WhatIsDrcPage),
    TranslateModule.forChild()
  ],
})
export class WhatIsDrcPageModule {}
