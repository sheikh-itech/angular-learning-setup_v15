import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'merge-map-operator',
  styles: ['p { color:red; }'],
  template: `
    <h2> Merge Map Operator </h2>
    <p>See console for more</p>
  `
})
export class MergeMapOperator implements OnInit {
  
  ngOnInit() {
    console.log('Actual values: ' +'1 2 3')
    const source = new Observable<number>(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });

    const example = source.pipe(
      mergeMap(x => new Observable<number>(subscriber => {
        setTimeout(() => {
          subscriber.next(x * 10);
          subscriber.complete();
        }, 2000);
      }))
    );
    
    example.subscribe(value => console.log('Merged Map Values: ' + value));
  }
}
