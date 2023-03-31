import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'http-delete',
  styles: [''],
  template: '<div> Delete request sent, see console and network <br/> Can send Param [also Body inside headers parallel to param]</div>'
})
export class HttpDeleteExample implements OnInit {

  constructor(private http: HttpClient) { }

  options = {
    headers: {
      'Authorization': 'Auth Header'
    },
    params: {
      name: "Arham vahleen"
    },
    body: {
      name: "Arham Vahleen",
      age: "1 year"
    },
    withCredentials: false
  };

  ngOnInit() {

    this.http.delete(environment.deleteUrl, this.options).subscribe(
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

    this.http.delete(environment.deleteUrl, this.options).subscribe(
      resp => {
        console.log(resp)
      },
      err => {
        console.log(err)
      }
    ).unsubscribe();
  }
}
