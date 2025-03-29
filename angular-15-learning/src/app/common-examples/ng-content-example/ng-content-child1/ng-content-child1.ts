import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-content-child1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-content-child1.html',
  styleUrls: ['./ng-content-child1.css']
})
export class NgContentChild1 {

}
