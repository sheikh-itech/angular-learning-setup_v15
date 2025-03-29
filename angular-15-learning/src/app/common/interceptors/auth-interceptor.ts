import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    // Automatically attaches the Authorization header to every HTTP request

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const authToken = 'Bearer YOUR_ACCESS_TOKEN';

        const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });

        return next.handle(clonedRequest);
    }
}
