import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    private cache = new Map<string, any>();

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (req.method !== 'GET') {
            return next.handle(req);   // Cache only GET requests
        }

        const cachedResponse = this.cache.get(req.url);
        if (cachedResponse) {
            return of(cachedResponse);  // Return cached response
        }

        return next.handle(req).pipe(
            tap(event => this.cache.set(req.url, event))
        );
    }
}
