import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatinineGraphPage } from './creatinine-graph';
import { CreatinineGraphService } from './creatinine-graph-service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreatinineGraphPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatinineGraphPage),
    TranslateModule.forChild()
  ],
  providers: [
    CreatinineGraphService
  ]
})
export class CreatinineGraphPageModule {}
