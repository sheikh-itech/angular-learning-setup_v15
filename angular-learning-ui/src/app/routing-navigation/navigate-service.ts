import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToUrl(url: any, routeData: any) {
    this.router.navigate([url, routeData]);
  }
}
