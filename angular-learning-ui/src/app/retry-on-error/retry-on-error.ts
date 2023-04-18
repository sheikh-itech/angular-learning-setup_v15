import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, of, retry, RetryConfig, Subscription, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'http-get',
  styles: [''],
  template: '<div> Error Handling & Re-Try request sent, see console and network </div>' +
  '<button type="button" (click)="makeAnotherCall();" class="btn btn-primary">Test</button>'
})
export class RetryOnError implements OnInit, OnDestroy {

  private subscription: Subscription;
  private retryConfig: RetryConfig;

  constructor(private http: HttpClient) {
    this.retryConfig = {};
    this.retryConfig.count = 3;
    this.retryConfig.delay = 5000;
    this.retryConfig.resetOnSuccess = true;
  }

  options = {
    headers: {
      'Authorization': 'Auth Header'
    },
    params: {
      name: "Arham vahleen"
    },
    withCredentials: false
  };

  ngOnInit() {

    this.subscription = this.http.get(environment.getUrl, this.options)
      .pipe(
        retry(3)
      )
      .subscribe(
        resp => {
          console.log(resp)
        },
        err => {
          console.log(err)
        }
      );
  }

  makeAnotherCall() {
    this.http.get(environment.getUrl, this.options)
      .pipe(
        retry(this.retryConfig)
      )
      .subscribe(
        resp => {
          console.log(resp)
        },
        err => {
          console.log(err)
        }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
