import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {

    constructor(private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe(event => {
                console.log('Navigation started:', event);
            });
    }
}
