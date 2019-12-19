import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizPage } from './quiz';
import { QuizService } from './quiz-service';
import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    QuizPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizPage),
    TranslateModule.forChild()
  ],
  providers: [
    QuizService,
    Device
  ]
})
export class QuizPageModule {}
