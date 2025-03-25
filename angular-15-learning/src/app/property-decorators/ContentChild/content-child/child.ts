import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.html',
  styleUrls: ['./child.css']
})
export class Child {

    @Input() message!: string;
}
