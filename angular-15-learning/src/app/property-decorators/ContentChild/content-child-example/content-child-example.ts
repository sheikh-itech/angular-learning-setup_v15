import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentChildParent } from '../content-child-parent/content-child-parent';
import { Child } from '../content-child/child';

@Component({
  selector: 'content-child-example',
  standalone: true,
  imports: [CommonModule, ContentChildParent, Child],
  templateUrl: './content-child-example.html',
  styleUrls: ['./content-child-example.css']
})
export class ContentChildExample {

}
