import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    constructor(private http: HttpClient, private router: Router) { }

    // GET request
    public getApi(url: string, options?: any): Observable<any> {

        /* Mask Loader Service here */
        
        return this.http.get<any>(url, options)
            .pipe(
                catchError(this.handleError),
                map(response => {
        
                    /* Mask Loader Service here- unmask */
        
                    return response;
                })
            );
    }

    // POST request
    postApi(url: string, body: any, options?: any): Observable<any> {
        return this.http.post<any>(url, body, options).pipe(
            catchError(this.handleError),
            map(response => response)
        );
    }

    // PUT request
    putApi(url: string, body: any, options?: any): Observable<any> {
        return this.http.put<any>(url, body, options).pipe(
            catchError(this.handleError),
            map(response => response)
        );
    }

    // PATCH request
    patchApi(url: string, body: any, options?: any): Observable<any> {
        return this.http.patch<any>(url, body, options).pipe(
            catchError(this.handleError),
            map(response => response)
        );
    }

    // DELETE request
    deleteApi(url: string, options?: any): Observable<any> {
        return this.http.delete<any>(url, options).pipe(
            catchError(this.handleError),
            map(response => response)
        );
    }

    // HEAD request
    headApi(url: string, options?: any): Observable<any> {
        return this.http.head<any>(url, options).pipe(
            catchError(this.handleError),
            map(response => response)
        );
    }

    // OPTIONS request
    optionsApi(url: string, options?: any): Observable<any> {
        return this.http.options<any>(url, options).pipe(
            catchError(this.handleError),
            map(response => response)
        );
    }

    // Error handling
    private handleError = (error: any): Observable<never> => {
        console.error('An error occurred:', error);
        if (error.status === 401 || error.error === 'Unauthorized') {
            this.router.navigate(['/login']);
        }
        return throwError(() => error);
    };
}
