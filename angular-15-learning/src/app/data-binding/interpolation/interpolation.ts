import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'interpolation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interpolation.html',
  styleUrls: ['./interpolation.css']
})
export class Interpolation {

    family: any = {
        son: "Arham Shekh",
        daughter: "Fatima Shekh",
        father: "Hapheej Shekh",
        grandMa: "Dadi",
        uncle: "Rafeek Shekh"
    }
}
