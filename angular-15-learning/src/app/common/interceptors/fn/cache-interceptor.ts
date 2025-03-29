import { HttpInterceptorFn } from '@angular/common/http';
import { of, tap } from 'rxjs';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {

    let cache = new Map<string, any>();

    if (req.method !== 'GET') {
        return next(req);   // Cache only GET requests
    }

    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
        return of(cachedResponse);  // Return cached response
    }

    return next(req).pipe(
        tap(event => cache.set(req.url, event))
    );
};
