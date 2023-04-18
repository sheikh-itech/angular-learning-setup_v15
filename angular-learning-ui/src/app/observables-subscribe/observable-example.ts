import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'observable-app',
  styles: ['p { color:red; }'],
  template: `
    <h2> Observable:- Within Component Subscribing </h2>
    <p>{{ message }}</p>
  `
})
export class ObservableExample implements OnInit {

  message: any;

  public callObservable(): Observable<any> {

    return new Observable(observer => {
      setTimeout(() => {
        observer.next('This is Response from Observable!');
        observer.complete();
      }, 2000);
    });
  }

  ngOnInit() {

    const myObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next('Hello from Observable!');
        observer.complete();
      }, 2000);
    });

    myObservable.subscribe({
      next: value => this.message = value,
      error: error => console.error(error),
      complete: () => console.log('Observable complete')
    });
  }
}
