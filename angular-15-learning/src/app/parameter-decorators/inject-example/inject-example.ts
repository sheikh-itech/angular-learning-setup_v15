import { Component, Inject, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';

@Component({
    selector: 'inject-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './inject-example.html',
    styleUrls: ['./inject-example.css']
})
export class InjectExample {

    constructor(@Inject(USER_TOKEN) public user: User,
        @Inject('MULTI_SERVICES') public services: any[]) {
            //MULTI_SERVICES from AppModule
        console.log(this.user);  // { id: 1, name: 'Arham' } from AppModule
    }
}

export interface User {
    id: number;
    name: string;
}

// InjectionToken for injecting the interface, providing input from main.ts
export const USER_TOKEN = new InjectionToken<User>('USER_TOKEN');


// Service 1
@Injectable({ providedIn: 'root' })
export class ServiceOne {
    getData() { return 'Service One'; }
}

// Service 2
@Injectable({ providedIn: 'root' })
export class ServiceTwo {
    getData() { return 'Service Two'; }
}
