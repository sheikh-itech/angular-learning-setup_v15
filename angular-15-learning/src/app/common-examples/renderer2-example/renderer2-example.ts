import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverHighlight } from 'src/app/directives/hover-highlight-directive';

@Component({
  selector: 'renderer2-example',
  standalone: true,
  imports: [CommonModule, HoverHighlight],
  templateUrl: './renderer2-example.html',
  styleUrls: ['./renderer2-example.css']
})
export class Renderer2Example {

}
