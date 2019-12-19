import { TranslateModule } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamsPage } from './exams';
import { ExamService } from './exam-service';

@NgModule({
  declarations: [
    ExamsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExamsPage),
    TranslateModule.forChild()
  ],
  providers: [
    ExamService,
    LocalNotifications
  ]
})
export class ExamsPageModule {}
