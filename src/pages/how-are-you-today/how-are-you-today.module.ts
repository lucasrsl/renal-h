import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowAreYouTodayPage } from './how-are-you-today';
import { HowAreYouTodayService } from './how-are-you-today-service';

@NgModule({
  declarations: [
    HowAreYouTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(HowAreYouTodayPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
  providers: [
    HowAreYouTodayService
  ]
})
export class HowAreYouTodayPageModule {}
