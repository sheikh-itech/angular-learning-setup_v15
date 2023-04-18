import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'http-get',
  styles: [''],
  template: '<div> Get request sent, see console and network </div>'
})
export class HttpGetExample implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private http: HttpClient) {  }

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

    this.subscription = this.http.get(environment.getUrl, this.options).subscribe(
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
