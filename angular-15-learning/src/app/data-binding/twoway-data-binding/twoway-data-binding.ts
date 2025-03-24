import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'twoway-data-binding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './twoway-data-binding.html',
  styleUrls: ['./twoway-data-binding.css']
})
export class TwowayDataBinding {

    firstName: String = "";
    secondName: String = "";

    updateFirstName($event: any) {

        this.firstName = ($event.target as HTMLInputElement).value;
    }
}
