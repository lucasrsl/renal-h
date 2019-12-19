import { TranslateModule } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicationPage } from './medication';
import { MedicationService } from './medication.service';

@NgModule({
  declarations: [
    MedicationPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicationPage),
    TranslateModule.forChild()
  ],
  providers: [
    MedicationService,
    LocalNotifications
  ]
})
export class MedicationPageModule {}
