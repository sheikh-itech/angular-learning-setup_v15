import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'  // Provided at the root level
})
export class ExampleService1 {
    
    getMessage(): string {
        return 'Hello from ExampleService1, Globally!';
    }
}
