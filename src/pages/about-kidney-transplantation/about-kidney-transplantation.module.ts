import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutKidneyTransplantationPage } from './about-kidney-transplantation';

@NgModule({
  declarations: [
    AboutKidneyTransplantationPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutKidneyTransplantationPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class AboutKidneyTransplantationPageModule {}
