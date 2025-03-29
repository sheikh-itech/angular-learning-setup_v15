import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {

    constructor() { }

    // Centralized error handling

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error:', error);
                alert(`An error occurred: ${error.status} - ${error.message}`);
                return throwError(() => error);  // Re-throw the error
            })
        );
    }
}
