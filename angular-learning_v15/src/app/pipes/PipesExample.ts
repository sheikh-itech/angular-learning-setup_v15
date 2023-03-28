import { Component } from '@angular/core';
import { CustomPipe } from './CustomPipe';

@Component({
  selector: 'pipes-example',
  template: '<p>The transformed value is {{ value | CustomPipe: arg1: arg2 }}</p>'
})
export class PipesExample {

  value = 15;
  arg1 = 7;
  arg2 = 9;
}
