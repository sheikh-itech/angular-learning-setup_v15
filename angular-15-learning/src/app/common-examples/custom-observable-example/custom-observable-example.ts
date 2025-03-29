import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'custom-observable-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './custom-observable-example.html',
    styleUrls: ['./custom-observable-example.css']
})
export class CustomObservableExample implements OnInit, OnDestroy {

    message: string = '';
    subscription!: Subscription;

    ngOnInit(): void {

        const myObservable = new Observable<string>((observer) => {

            observer.next('First value- produced by Observable');
            setTimeout(() => observer.next('Second value- produced by Observable'), 2000);
            setTimeout(() => observer.next('Third value- produced by Observable'), 4000);
            setTimeout(() => observer.complete(), 6000);
        });

        // Subscribing to the observable
        this.subscription = myObservable.subscribe({

            next: (value) => this.message = value,
            error: (err) => console.error('Error:', err),
            complete: () => console.log('Observable completed')
        });
    }

    ngOnDestroy(): void {

        this.subscription.unsubscribe();
    }
}
