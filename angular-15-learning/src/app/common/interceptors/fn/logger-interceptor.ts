import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('Request log: ', req);

    return next(req).pipe(
    
            tap(event => console.log('Response log:', event))   // tap logs response
            
    );
};
