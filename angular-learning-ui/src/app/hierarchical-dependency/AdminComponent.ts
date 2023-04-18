import { Component } from '@angular/core';
import { FullNameService } from './FullNameService';
import { UserNameService } from './UserNameService';


@Component({
  selector: 'admin-service-component',
  template: '<p>Name from Service: {{name}}</p>',
  providers: [{ provide: UserNameService, useClass: FullNameService }]
})
export class AdminComponent {

  name: any;

  constructor(private service: UserNameService) {
    this.name = service.getName();
  }
}
