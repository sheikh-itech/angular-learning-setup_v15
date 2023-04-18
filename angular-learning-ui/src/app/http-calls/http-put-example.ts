import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'http-put',
  styles: [''],
  template: '<div> Put request sent, see console and network <br/> Can send Body & Param both in Put Request also</div>'
})
export class HttpPutExample implements OnInit {

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

  payload = {
    name: "Arham Vahleen",
    age: "1 year"
  };

  ngOnInit() {

    this.http.put(environment.putUrl, this.payload, this.options).subscribe(
      resp => {
        console.log(resp)
        this.otherCall();
      },
      err => {
        console.log(err)
        this.otherCall();
      }
    ).unsubscribe();
  }

  private otherCall() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer My Token'
    });
    this.http.put(environment.putUrl, this.payload, { headers }).subscribe(
      resp => {
        console.log(resp)
      },
      err => {
        console.log(err)
      }
    ).unsubscribe();
  }
}
