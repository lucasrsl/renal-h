import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodaySchedulePage } from './today-schedule';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    TodaySchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(TodaySchedulePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class TodaySchedulePageModule {}
