import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defer, EMPTY, from, interval, Observable, of, range, take, throwError, timer } from 'rxjs';

@Component({
    selector: 'observable-creation-ways',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './observable-creation-ways.html',
    styleUrls: ['./observable-creation-ways.css']
})
export class ObservableCreationWays {

    // 1. Manual Creation-      new Observable()

    customObservable1 = new Observable(observer => {
        observer.next('First Value');    // Emit value
        observer.next('Second Value');

        setTimeout(() => {
            observer.next('Third Value');
            observer.complete();         // Complete the stream
        }, 2000);

        return () => console.log('Observable Unsubscribed!');
    });
    

    // 2. Emit a Sequence of Values-   of()

    customObservable2 = of(1, 2, 3, 4, 5);


    // 3. Convert Iterable or Promise to Observable-    from()

    customObservable3 = from([10, 20, 30, 40]);


    // 4. Observable with Promise

    promise = new Promise((resolve) => {
        setTimeout(() => resolve('Resolved Promise!'), 2000);
    });
    
    customObservable4 = from(this.promise);


    // 5. Observable with Interval

    customObservable5 = interval(1000).pipe(take(5));  // Emit 5 values at 1s intervals


    // 6. Observable with Timer

    customObservable6 = timer(2000, 1000).pipe(take(5));  // Start after 2s, emit every 1s


    // 7. Emit a Sequence of Numbers-      range()

    customObservable7 = range(1, 5);  // Emit values from 1 to 5


    // 8. Emits Nothing and Completes Immediately-  empty()

    customObservable8 = EMPTY;


    // 9. Emits an Error and Completes-     throwError()

    customObservable9 = throwError(() => new Error('Something went wrong!'));


    // 10. Creates an Observable at Subscription Time-     defer()

    customObservable10 = defer(() => of(Math.random()));


    accessObservable(): void {

        this.customObservable1.subscribe({
            next: value => console.log(value),
                complete: () => console.log('Observable1 completed!'),
                    error: err => console.error(err)
        });

        this.customObservable2.subscribe({
            next: value => console.log(value),
            complete: () => console.log('Observable2 completed!')
        });

        this.customObservable3.subscribe({
            next: value => console.log(value),
            complete: () => console.log('Observable3 completed!')
        });

        this.customObservable4.subscribe({
            next: value => console.log(value),
            complete: () => console.log('Observable4 completed!')
        });

        this.customObservable5.subscribe({
            next: value => console.log(value),
            complete: () => console.log('Observable5 completed!')
        });

        this.customObservable6.subscribe({
            next: value => console.log(value),
            complete: () => console.log('Observable6 completed!')
        });

        this.customObservable7.subscribe({
            next: value => console.log(value),
            complete: () => console.log('Observable7 completed!')
        });

        this.customObservable8.subscribe({
            next: value => console.log(value),
            complete: () => console.log('Observable8 completed!')
        });

        this.customObservable9.subscribe({
            next: value => console.log(value),
            complete: () => console.log('Observable9 completed!')
        });

        this.customObservable10.subscribe(val => console.log('Observable10 completed! ', val));
        this.customObservable10.subscribe(val => console.log('Observable10 completed! ', val));
    }
}
