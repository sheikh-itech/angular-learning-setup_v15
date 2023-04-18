import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, map, retryWhen, takeWhile, delayWhen } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'retry-adv',
  styles: [''],
  template: '<div> Error Handling & Re-Try request sent, see console and network </div>' +
    '<button type="button" (click)="processResponse();" class="btn btn-primary">Test</button>'
})
export class RetryOnErrorAdv implements OnInit {

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
    this.getData().subscribe(
      resp => {
        console.log(resp)
      },
      err => {
        console.log(err)
      }
    );
  }

  processResponse() {
    this.getData().subscribe(
      resp => {
        console.log(resp)
      },
      err => {
        console.log(err)
      }
    );
  }

  getData(): Observable<any> {
    return this.http.get<any>(environment.getUrl, this.options).pipe(
      retryWhen(errors => errors.pipe(
        // Retry up to 3 times with an increasing delay between each retry
        delayWhen((_, attempt) => {
          if (attempt < 3) {
            return timer(1000 * Math.pow(2, attempt));
          } else {
            return throwError('Maximum retries reached');
          }
        }),
        // Only retry for certain error status codes
        takeWhile((error: HttpErrorResponse) => [500, 502, 503, 504].includes(error.status)),
      )),
      map(response => {
        // Map the response to the desired format
        return response.data.map((item: any) => {
          return {
            id: item.id,
            name: item.attributes.name,
            description: item.attributes.description,
            date: new Date(item.attributes.date),
          };
        });
      }),
      catchError(error => {
        // Handle errors and return a new observable
        console.log('Error:', error);
        return throwError('Error fetching data');
      })
    );
  }
}
