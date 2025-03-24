import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputChildExample } from '../input-child-example/input-child-example';

@Component({
  selector: 'input-example',
  standalone: true,
  imports: [CommonModule, InputChildExample],
  templateUrl: './input-example.html',
  styleUrls: ['./input-example.css']
})
export class InputExample {

}
