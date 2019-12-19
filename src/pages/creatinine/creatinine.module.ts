import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatininePage } from './creatinine';
import { CreatinineService } from './creatinine-service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreatininePage,
  ],
  imports: [
    IonicPageModule.forChild(CreatininePage),
    TranslateModule.forChild()
  ],
  providers: [
    CreatinineService
  ]
})
export class CreatininePageModule {}
