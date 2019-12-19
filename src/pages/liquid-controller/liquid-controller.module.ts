import { TranslateModule } from '@ngx-translate/core';
import { LiquidControllerService } from './liquid-controller-service';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiquidControllerPage } from './liquid-controller';

@NgModule({
  declarations: [
    LiquidControllerPage,
  ],
  imports: [
    IonicPageModule.forChild(LiquidControllerPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
  providers: [
    LiquidControllerService
  ]
})
export class LiquidControllerPageModule {}
