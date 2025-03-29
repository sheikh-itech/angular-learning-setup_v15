import { HttpInterceptorFn } from '@angular/common/http';

export const basicHttpInterceptor: HttpInterceptorFn = (req, next) => {

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

        return next(modifiedReq);
};
