import { Component, OnInit } from '@angular/core';;
import { ObservableExample } from './observable-example';

@Component({
  selector: 'subscribe-app',
  styles: ['p { color:red; }'],
  template: `
    <h1>Subscribed to My Observable</h1>
    <p>{{ message }}</p>
  `
})
export class SubscribeExample implements OnInit {

  message: any;

  constructor(private observable: ObservableExample) { }

  ngOnInit() {

    const myObservable = this.observable.callObservable();

    myObservable.subscribe({
      next: value => this.message = value,
      error: error => console.error(error),
      complete: () => console.log('Observable complete')
    });
  }
}
