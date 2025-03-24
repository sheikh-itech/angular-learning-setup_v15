import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, CanDeactivateFn, CanLoadFn, CanMatchFn, ResolveFn, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../common/auth-service';
import { inject } from '@angular/core';
import { SimpleForm } from '../different-forms/simple-form/simple-form';
import { DataService } from '../common/data-service';
import { catchError, of } from 'rxjs';


/*  New Functional Guard (Preferred)   */


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const authService = inject(AuthService);

    return authService.isLoggedIn();
};


export const confirmLeaveGuard: CanDeactivateFn<SimpleForm> = (component, route, state) => {

    const authService = inject(AuthService);

    return !authService.isLoggedIn() ? confirm('Discard changes?') : true;
};


export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {

    const authService = inject(AuthService);

    return authService.isLoggedIn() ? true : false;
};


export const canActivateChildGuard: CanActivateChildFn = (childRoute, state) => {

    const authService = inject(AuthService);

    return authService.isLoggedIn(); // Only allow access if logged in
};


export const canLoadGuard: CanLoadFn = (route: Route, segments: UrlSegment[]) => {

    const authService = inject(AuthService);

    return authService.isLoggedIn();
};

export const httpResolve: ResolveFn<any> = (route, state) => {

    const postService = inject(DataService);

    return postService.getData().pipe(
        catchError((e) => of(console.log('Error: ',e))) // Handle errors gracefully
    );
};
