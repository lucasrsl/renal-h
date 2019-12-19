import { TranslateModule } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { AddMedPage } from './add-med';
import { AddMedService } from './add-med.service';

@NgModule({
  declarations: [
    AddMedPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMedPage),
    TranslateModule.forChild()
  ],
  providers: [
    AddMedService,
    LocalNotifications
  ]
})
export class AddMedPageModule {}
