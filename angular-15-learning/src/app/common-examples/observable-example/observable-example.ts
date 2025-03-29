import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'observable-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './observable-example.html',
    styleUrls: ['./observable-example.css']
})
export class ObservableExample implements OnInit {

    users: any[] = [];

    ngOnInit(): void {
        
        // Subscribing to the Observable
        this.getUsers().subscribe({
            next: (data) => this.users = data,
            error: (err) => console.error('Error:', err),
            complete: () => console.log('Data fetch completed')
        });
    }


    // Actual data comes from Observable of HTTP Request
    private getUsers(): Observable<any[]> {

        const myObservable = new Observable<User[]>((observer) => {

            const u1: User = new User('Arham', 'Arham@example.com');
            const u2: User = new User('Fatima', 'Fatima@example.com');
            observer.next([u1, u2]);
        });

        return myObservable;
    }
}

export class User {
    name!: string;
    email!: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}