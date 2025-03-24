import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'attribute-binding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attribute-binding.html',
  styleUrls: ['./attribute-binding.css']
})
export class AttributeBinding {

    columnCount = 3;
    inputLabel = 'Dynamic input label';
    placeholder = "Property Binded Text";
}
