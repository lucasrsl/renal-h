import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestHydrationPage } from './test-hydration';

@NgModule({
  declarations: [
    TestHydrationPage,
  ],
  imports: [
    IonicPageModule.forChild(TestHydrationPage),
    TranslateModule.forChild()
  ],
})
export class TestHydrationPageModule {}
