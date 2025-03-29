import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {

    // Centralized error handling

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Error:', error);
            alert(`An error occurred: ${error.status} - ${error.message}`);
            return throwError(() => error);  // Re-throw the error
        })
    );
};
