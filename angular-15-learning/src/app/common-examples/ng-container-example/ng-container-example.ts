import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-container-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-container-example.html',
  styleUrls: ['./ng-container-example.css']
})
export class NgContainerExample {

    show: boolean = true;
    isLoggedIn: boolean = false;
    products: any [] = ['Apple', 'Papaya', 'Banana'];
    users: any [] = ['Arham', 'Fatima'];
    status = 'active';
}
