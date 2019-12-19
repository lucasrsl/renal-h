import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { AccordionComponent } from './accordion/accordion';

@NgModule({
	declarations: [
		ProgressBarComponent,
    AccordionComponent	],
	imports: [],
	exports: [ProgressBarComponent,
    AccordionComponent]
})
export class ComponentsModule {}
