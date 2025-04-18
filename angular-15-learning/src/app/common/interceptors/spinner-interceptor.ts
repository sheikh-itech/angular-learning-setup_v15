import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../loading-service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        this.loadingService.show();
        return next.handle(req).pipe(
            finalize(() => this.loadingService.hide())   // Hide spinner when complete
        );
    }
}
