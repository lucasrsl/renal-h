import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatMainFunctionKidneyPage } from './what-main-function-kidney';

@NgModule({
  declarations: [
    WhatMainFunctionKidneyPage,
  ],
  imports: [
    IonicPageModule.forChild(WhatMainFunctionKidneyPage),
    TranslateModule.forChild()
  ],
})
export class WhatMainFunctionKidneyPageModule {}
