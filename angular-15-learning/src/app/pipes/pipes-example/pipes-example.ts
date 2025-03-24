import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pipes-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pipes-example.html',
  styleUrls: ['./pipes-example.css']
})
export class PipesExample {

    dataLoaded = false;

    today = new Date();
    person = { name: 'Arham Shekh', age: 3, city: 'Bheda' };
    
    sliceData = "This data is for pipe chain";
    
    asyncData = new Promise<string>((resolve) => {
        setTimeout(() => {
          this.dataLoaded = true;
          resolve('Async Data Loaded!');
        }, 4000);
      });    
}
