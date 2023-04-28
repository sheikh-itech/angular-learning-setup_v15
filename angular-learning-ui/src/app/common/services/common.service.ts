import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MaskLoaderService } from './mask-loader-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private router: Router,
    private mask: MaskLoaderService) { }

  //Data null if not required
  public postApi(url: string, data: any): Observable<any> {
    this.mask.updateMask(true);
    return this.http.post<any>(url, data)
      .pipe(
        catchError(this.handleError.bind(this)),
        map(response => {
          this.mask.updateMask(false);
          return response;
      })
    );
  }

  public getApiWithData(url: string, data: any): Observable<any> {
    this.mask.updateMask(true);
    return this.http.get<any>(url, { params: { data } })
      .pipe(
        catchError(this.handleError.bind(this)),
        map(response => {
          this.mask.updateMask(false);
          return response;
        })
    );
  }

  public getApiWithoutData(url: string): Observable<any> {
    this.mask.updateMask(true);
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError.bind(this)),
        map(response => {
          this.mask.updateMask(false);
          return response;
        })
    );
  }

  public deleteApi(url: string, data: any): Observable<any> {
    let options = {
      headers: {},
      /*params: {id: data}, Sending as Path Variable */
      body: { data },
      withCredentials: false
    };
    this.mask.updateMask(true);
    return this.http.delete(url, options)
      .pipe(
        catchError(this.handleError.bind(this)),
        map(response => {
          this.mask.updateMask(false);
          return response;
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    this.mask.updateMask(false);
    // Api returned an unsuccessful response
    if (error.error == 'Incorrect username or password' || error.statusText == 'Unknown Error' || error.error.error == 'Unauthorized') {
      this.enableLogin();
    } else if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }

  private enableLogin() {

    //localStorage.removeItem('~p-da-b-s');
    this.router.navigate(['/login'], { queryParams: {} });
  }
}
