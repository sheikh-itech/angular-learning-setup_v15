import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "../../loading-service";
import { finalize } from "rxjs";

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

    let loadingService = inject(LoadingService);

    loadingService.show();

    return next(req).pipe(
        finalize(() => loadingService.hide())   // Hide spinner when complete
    );
};
