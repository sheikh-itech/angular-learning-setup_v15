import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-template-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-template-example.html',
  styleUrls: ['./ng-template-example.css']
})
export class NgTemplateExample {

    isLoggedIn: boolean = true;
    products: any [] = ['Apple', 'Papaya', 'Banana'];
    users: any [] = ['Arham', 'Fatima'];
    items: any [] = ['Banana', 'Milk', 'Chicken'];
    useTemplate = '';
    user = 'Arham';
}
