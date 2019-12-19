import { ClinicSelectService } from './clinic-select.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicSelectPage } from './clinic-select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClinicSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicSelectPage),
    TranslateModule.forChild()
  ],
  providers: [
    ClinicSelectService
  ]
})
export class ClinicSelectPageModule {}
