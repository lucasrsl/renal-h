import { Directive, ElementRef, Renderer } from '@angular/core';

/**
 * Generated class for the LimitInputNumberDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[limit-input-number]', // Attribute selector
  host: {
    '(ionChange)': 'onChange($event)'
  }
})
export class LimitInputNumberDirective {

  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('Hello LimitInputNumberDirective Directive');
  }

  onChange(ev){
    console.log(ev);
  }

}
