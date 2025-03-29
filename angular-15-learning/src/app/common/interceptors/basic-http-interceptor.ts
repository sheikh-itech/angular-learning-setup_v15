import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicHttpInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        console.log('Intercepted Request:', req);

        const authToken = 'Bearer YOUR_ACCESS_TOKEN';

        let modifiedReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });

        
        /** Custom Headers */

        // Check if the request contains multimedia or PDF
        if (req.url.includes('/upload')) {
            modifiedReq = req.clone({
                headers: req.headers
                    .set('Authorization', authToken)
                    .set('Content-Type', 'multipart/form-data') // For multimedia upload
            });
        }

        else if (req.url.includes('/pdf')) {
            modifiedReq = req.clone({
                headers: req.headers
                    .set('Authorization', authToken)
                    .set('Content-Type', 'application/pdf') // For PDF uploads
            });
        }

        return next.handle(modifiedReq);
    }
}
