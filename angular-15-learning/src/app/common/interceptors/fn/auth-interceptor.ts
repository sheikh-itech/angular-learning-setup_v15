import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('Auth Interceptor applied');

    const authToken = 'Bearer YOUR_ACCESS_TOKEN';

    const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', authToken)
    });

    return next(clonedRequest);
};
