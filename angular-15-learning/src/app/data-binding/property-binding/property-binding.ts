import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'property-binding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-binding.html',
  styleUrls: ['./property-binding.css']
})
export class PropertyBinding {

    family: any = {
        son: "Arham Shekh",
        daughter: "Fatima Shekh",
        father: "Hapheej Shekh",
        grandMa: "Dadi",
        uncle: "Rafeek Shekh"
    }
}
