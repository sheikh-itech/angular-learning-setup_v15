import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('Request log: ', request);

    return next.handle(request).pipe(
    
            tap(event => console.log('Response log:', event))   // tap logs response
            
    );
  }
}
