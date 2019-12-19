import { TranslateModule } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddQueryPage } from './add-query';
import { AddQueryService } from './add-query.service';

@NgModule({
  declarations: [
    AddQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddQueryPage),
    TranslateModule.forChild()
  ],
  providers:[
    AddQueryService,
    LocalNotifications
  ]
})
export class AddQueryPageModule {}
