import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InternetErrorPage } from './internet-error';
import { InternetErrorService } from './internet-error-service';

@NgModule({
  declarations: [
    InternetErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(InternetErrorPage),
    TranslateModule.forChild()
  ],
  providers: [
    InternetErrorService
  ]
})
export class InternetErrorPageModule {}
