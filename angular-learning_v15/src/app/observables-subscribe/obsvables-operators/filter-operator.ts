import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'filter-operator',
  styles: ['p { color:red; }'],
  template: `
    <h2> Filter Operator </h2>
    <p>See console for more</p>
  `
})
export class FilterOperator implements OnInit {
  
  ngOnInit() {

    console.log('Actual values: ' + '1 2 3')
    const source = new Observable<number>(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });

    const example = source.pipe(
      filter(value => value > 1)
    );

    let mapped = '';
    example.subscribe(value => mapped += value + ' ');
    console.log('Filtered Values: ' + mapped);
  }
}
