import { Component } from '@angular/core';

@Component({
  selector: 'attribute-derective',
  styles: ['.error{color: red;}'],
  template:
    '<div [ngClass]="{ \'error\': isError, \'highlight\': isHighlight }">Some text</div>' +
    '<div [ngStyle]="{ \'font-size\': isLarge ? \'24px\' : \'12px\', \'color\': isRed ? \'red\' : \'blue\' }">Some text</div>'
})
export class AttributeDirective {

  isError =true;
  isLarge = true;

  isHighlight = false;
  isRed = false;
}
