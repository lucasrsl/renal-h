import { Component, ViewChild } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent {
  @ViewChild('accordionBody') accordionBody: any;
  @ViewChild('accordionTitle') accordionTitle: any;
  constructor() {
  }
  accordionClick(){
    let accordionBody = this.accordionBody.nativeElement;
    let accordionTitle = this.accordionTitle.nativeElement;

    if(accordionBody.classList[1] == 'trigged'){
      accordionBody.classList.remove('trigged');
      accordionBody.classList.add('collapsed');
      accordionTitle.classList.remove('trigged');
      accordionTitle.classList.add('collapsed');
    }else{
      accordionBody.classList.remove('collapsed');
      accordionBody.classList.add('trigged');
      accordionTitle.classList.remove('collapsed');
      accordionTitle.classList.add('trigged');
    }
  }
}
