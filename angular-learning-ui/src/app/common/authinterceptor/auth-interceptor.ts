import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var token = localStorage.getItem("~u-d-f-va");

    if (token != null)
      token = JSON.parse(token).username;

    if (token && null != token)
      token = "Bearer " + token;
    else
      token = "";

    const reqParams = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        .set('Authorization', token)
    });
    const reqParams1 = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    });

    return next.handle((token!='')? reqParams : reqParams1);
  }
}
