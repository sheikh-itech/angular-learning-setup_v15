import { Component } from '@angular/core';
import { CustomService } from './CustomService';

@Component({
  selector: 'service-component',
  template: '<p>Service name: {{name}}</p>'
})
export class CustomServiceUsage {

  name: string;

  constructor(private myService: CustomService) {
    this.myService.initService();
    this.name = this.myService.getData();
  }
}
