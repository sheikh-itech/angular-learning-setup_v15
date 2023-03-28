import { Component } from '@angular/core';

@Component({
  selector: 'template-driven-form1',
  templateUrl: './template-driven-form1.html',
  styleUrls: ['./template-driven-form1.css']
})
export class TemplateDrivenForm1 {

  addresses:any = [];

  addAddress() {
    this.addresses.push({ street: '', city: '', state: '' });
  }

  removeAddress(index: number) {
    this.addresses.splice(index, 1);
  }
}
