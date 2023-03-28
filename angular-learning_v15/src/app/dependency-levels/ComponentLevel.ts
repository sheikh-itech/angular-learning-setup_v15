import { Component } from '@angular/core';
import { DataService } from './data/DataService';

@Component({
  selector: 'app-my-component',
  template: '<h1>My Component</h1>',
  providers: [DataService] // <-- provide LoggerService at Component level
})
export class ComponentLevel { }
