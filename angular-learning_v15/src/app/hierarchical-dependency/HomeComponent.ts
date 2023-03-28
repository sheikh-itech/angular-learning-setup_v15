import { Component } from '@angular/core';
import { UserNameService } from './UserNameService';


@Component({
  selector: 'home-service-component',
  template: '<p>Name from Service: {{name}}</p>'
})
export class HomeComponent {

  name: any;

  constructor(private service: UserNameService) {
    this.name = service.getName();
  }
}
