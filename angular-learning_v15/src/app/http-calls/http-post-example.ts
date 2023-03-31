import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'http-get',
  styles: [''],
  template: '<div> Post request sent, see console and network <br/> Can send Body & Param both in Post Request</div>'
})
export class HttpPostExample implements OnInit, OnDestroy {

  constructor(private http: HttpClient) { }

  private subscription: Subscription;

  options = {
    headers: {
      'Authorization': 'Auth Header'
    },
    params: {
      name: "Arham vahleen"
    },
    withCredentials: false
  };

  payload = {
    name: "Arham Vahleen",
    age: "1 year"
  };

  ngOnInit() {

    this.subscription = this.http.post(environment.postUrl, this.payload, this.options).subscribe(
      resp => {
        console.log(resp)
        this.otherCall();
      },
      err => {
        console.log(err)
        this.otherCall();
      }
    );
  }

  private otherCall() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer My Token'
    });
    this.http.post(environment.postUrl, this.payload, { headers } ).subscribe(
      resp => {
        console.log(resp)
      },
      err => {
        console.log(err)
      }
    ).unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
