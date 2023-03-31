import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'subscribe-app',
  styles: ['p { color:red; }'],
  template: `
    <h2>Observable Flat-Map Example</h2>
    <p>{{ message }}, See more on console</p>
  `
})
export class ObservableFlatMapChain implements OnInit {

  message: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get(environment.cities)
      .pipe(
        flatMap((resp: any) => {
          const id = resp.data[0].id;
          return this.http.get(environment.cityById + id);
        })
      )
      .subscribe(
        (result: any) => {
          this.message = result.message;
          console.log(result.data);
        },
        (error: any) => {
          this.message = error;
          console.log(error);
        }
      );
  }
}
