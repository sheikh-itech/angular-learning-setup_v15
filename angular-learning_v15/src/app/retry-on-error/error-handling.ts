import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, of, Subscription, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'http-get',
  styles: [''],
  template: '<div> Error handling request sent, see console and network </div>'
})
export class ErrorHadnling implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private http: HttpClient) { }

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
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return of({ data: null });
          } else {
            return throwError('Something went wrong');
          }
        })
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
