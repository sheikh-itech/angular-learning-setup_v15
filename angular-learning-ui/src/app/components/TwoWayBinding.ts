import { Component } from '@angular/core';

@Component({
  selector: 'two-way-binding',
  template: '<label for="name">Name:</label>'+
            '<input type="text" id="name" [(ngModel)]="name" >'+
            '<p>Your name is:  {{ name }}</p>'
})
export class TwoWayBinding {

  /* 2 Way Event binding using- Property & Interpolation */

  public name = "";

}
