import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceTermPage } from './service-term';
import { ServiceTermService } from './service-term.service';

@NgModule({
  declarations: [
    ServiceTermPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceTermPage),
    TranslateModule.forChild()
  ],
  providers: [
    ServiceTermService
  ]
})
export class ServiceTermPageModule {}
