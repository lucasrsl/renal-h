import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddExamPage } from './add-exam';
import { AddExamService } from './add-exam.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddExamPage,
  ],
  imports: [
    IonicPageModule.forChild(AddExamPage),
    TranslateModule.forChild()
  ],
  providers: [
    AddExamService,
    LocalNotifications
  ]
})
export class AddExamPageModule {}
