import { Component, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleService1 } from '../self-example/example-service1';
import { ExampleService2 } from '../self-example/example-service2';

@Component({
    selector: 'optional-example',
    standalone: true,
    imports: [CommonModule],
    providers: [ExampleService2],
    templateUrl: './optional-example.html',
    styleUrls: ['./optional-example.css']
})
export class OptionalExample {

    message1: string = '';
    message2: string = '';

    constructor(private exampleService1: ExampleService1, //Resolved from root injector
        @Optional() private exampleService2: ExampleService2)   //Provides Service Locally only if null
    {
        this.message1 = this.exampleService1.getMessage();
        this.message2 = this.exampleService2.getMessage();
    }
}
