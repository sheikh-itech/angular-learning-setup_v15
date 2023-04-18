import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  constructor(private location: Location) { }

  goToHome() {
    
    this.location.go('/');
  }
  goToExample() {

    window.open('https://www.example.com', '_blank');
  }
}
