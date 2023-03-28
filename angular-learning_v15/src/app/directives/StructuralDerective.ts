import { Component } from '@angular/core';

@Component({
  selector: 'structural-derective',
  template: '<ng-container *ngIf="loggedIn"> <p>Welcome back!</p> </ng-container>' +
    '<ul><li *ngFor="let item of items">{{ item }}</li></ul>' +
    '<div [ngSwitch]="color">'+
      '<p *ngSwitchCase="red"> Red </p>'+
      '<p *ngSwitchCase="green"> Green </p>'+
      '<p *ngSwitchCase="blue"> Blue </p>'+
      '<p *ngSwitchDefault> Unknown color </p>' +
    '</div>'
})
export class StructuralDerective {

  loggedIn = true;
  items = ['Banana', 'Apple', 'Papaya'];
  //color: any;   Matching all condition true
  color = 'black';

  red: any;
  blue: any;
  green: any;
}
