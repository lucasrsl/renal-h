import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordPage } from './change-password';
import { ChangePasswordService } from './change-password.service';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordPage),
    TranslateModule.forChild()
  ],
  providers: [
    ChangePasswordService
  ]
})
export class ChangePasswordPageModule {}
