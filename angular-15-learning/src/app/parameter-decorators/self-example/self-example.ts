import { Component, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleService1 } from './example-service1';
import { ExampleService2 } from './example-service2';

@Component({
  selector: 'self-example',
  standalone: true,
  imports: [CommonModule],
  providers: [ExampleService2],  //Local provider
  templateUrl: './self-example.html',
  styleUrls: ['./self-example.css']
})
export class SelfExample {

    message1: string = '';
    message2: string = '';

    constructor(private exampleService1: ExampleService1, //Resolved from root injector
        @Self() private exampleService2: ExampleService2)   //Provides Service Locally
    {   
        this.message1 = this.exampleService1.getMessage();
        this.message2 = this.exampleService2.getMessage();
    }
}
