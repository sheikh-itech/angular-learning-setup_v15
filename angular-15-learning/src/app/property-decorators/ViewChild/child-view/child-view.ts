import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'child-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-view.html',
  styleUrls: ['./child-view.css']
})
export class ChildView {

    childMessage: string = 'Hello from Child!';

    sayHello(): string {
        return this.childMessage;
    }
}
