import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

export const redirectResolver = (route: ActivatedRouteSnapshot): void => {
    
    const router = inject(Router);  // Inject Router
    const id = route.paramMap.get('id');

    // Perform the redirection
    if (id) {
        router.navigate(['/profileExample', id]);
    } else {
        router.navigate(['/error']);  // Fallback route if no ID
    }
};

export const routeResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {

    //const userService = inject(UserService);
    const id = route.paramMap.get('id');
    //return userService.getUser(id);

    return id;
};