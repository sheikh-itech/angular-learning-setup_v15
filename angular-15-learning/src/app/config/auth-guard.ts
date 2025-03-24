import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/*  Not preferred way after Angular-15, Use functional style instead  */


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return true;
  }
  
  /*
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.permissions.canActivate(this.currentUser, route.params.id);
    } */
}
