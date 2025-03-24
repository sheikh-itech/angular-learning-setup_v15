import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPipe } from '../custom-pipe';

@Component({
  selector: 'custom-pipes-example',
  standalone: true,
  imports: [CommonModule, CustomPipe],
  templateUrl: './custom-pipes-example.html',
  styleUrls: ['./custom-pipes-example.css']
})
export class CustomPipesExample {

    longSentence = "This is a long sentence that needs truncating";

}
