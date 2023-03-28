import { Component } from '@angular/core';

@Component({
  selector: 'event-binding',
  template: '<input type="text" (input)="search($event)"><br/><br/><br/><br/>'+
            'Input: {{inputValue}}'
})
export class EventBinding {

  /* Event binding using- input event */
  inputValue: any = "";

  search(event: any) {
    this.inputValue = event.target.value;
  }
}
