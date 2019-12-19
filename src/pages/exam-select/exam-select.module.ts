import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamSelectPage } from './exam-select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ExamSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamSelectPage),
    TranslateModule.forChild()
  ],
})
export class ExamSelectPageModule {}
