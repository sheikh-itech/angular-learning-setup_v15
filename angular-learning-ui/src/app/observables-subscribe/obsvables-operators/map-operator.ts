import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'map-operator',
  styles: ['p { color:red; }'],
  template: `
    <h2> Map Operator </h2>
    <p>See console for more</p>
  `
})
export class MapOperator implements OnInit {
  
  ngOnInit() {
    console.log('Actual values: ' +'1 2 3')
    const source = new Observable<number>(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });

    const example = source.pipe(
      map(value => value * 10)
    );
    
    let mapped = '';
    example.subscribe(value => mapped += value+' ');
    console.log('Mapped Values: '+mapped);
  }
}
