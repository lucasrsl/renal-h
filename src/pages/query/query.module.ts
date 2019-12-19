import { TranslateModule } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QueryPage } from './query';
import { QueryService } from './query-service';

@NgModule({
  declarations: [
    QueryPage,
  ],
  imports: [
    IonicPageModule.forChild(QueryPage),
    TranslateModule.forChild()
  ],
  providers: [
    QueryService,
    LocalNotifications
  ]
})
export class QueryPageModule {}
