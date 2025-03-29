import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgContentChild1 } from './ng-content-child1/ng-content-child1';
import { NgContentChild2 } from './ng-content-child2/ng-content-child2';
import { NgContentChild3 } from './ng-content-child3/ng-content-child3';
import { NgContentChild4 } from './ng-content-child4/ng-content-child4';
import { NgContentChild5 } from './ng-content-child5/ng-content-child5';

@Component({
  selector: 'ng-content-example',
  standalone: true,
  imports: [CommonModule, NgContentChild1, NgContentChild2, NgContentChild3, NgContentChild4, NgContentChild5],
  templateUrl: './ng-content-example.html',
  styleUrls: ['./ng-content-example.css']
})
export class NgContentExample {

    isVisible: boolean = true;
    showContent: boolean = true;
    isHighlighted: boolean = true;
}
