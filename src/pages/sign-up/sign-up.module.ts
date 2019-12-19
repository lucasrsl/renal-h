import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import { SignUpService } from './sign-up.service';

@NgModule({
  declarations: [
    SignUpPage
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    TranslateModule.forChild()
  ],
  providers: [
    SignUpService
  ]
})
export class SignUpPageModule {}
