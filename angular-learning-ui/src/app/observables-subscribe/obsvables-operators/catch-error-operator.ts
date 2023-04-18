import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'catch-error-operator',
  styles: ['p { color:red; }'],
  template: `
    <h2> Catch Error Operator </h2>
    <p>See console for more</p>
  `
})
export class CatchErrorOperator implements OnInit {
  
  ngOnInit() {

    const source = new Observable<number>(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.error('Error occurred');
    });

    const example = source.pipe(
      catchError(error => of(4, 5, 6))
    );
    console.log('Catch Error Usage')
    example.subscribe(value => console.log('Success: '+value), error => console.log('Error: '+error));
  }
}
