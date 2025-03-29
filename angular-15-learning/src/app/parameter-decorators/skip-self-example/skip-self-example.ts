import { Component, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleService1 } from '../self-example/example-service1';

@Component({
    selector: 'skip-self-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skip-self-example.html',
    styleUrls: ['./skip-self-example.css']
})
export class SkipSelfExample {

    message1: string = '';

    //Resolve from root injector, Skip Locally
    constructor(@SkipSelf() private exampleService1: ExampleService1) {
        this.message1 = this.exampleService1.getMessage();
    }
}
