import { Component } from '@angular/core';

@Component({
  selector: 'property-binding',
  template: '<h2>Welcome, {{ user.name }}!</h2><img [src]="user.avatarUrl" alt="Avatar" class="avtar">'
})
export class PropertyBinding {

  /* Property binding using- [] */

  user = {
    name: 'Arham Vahleen',
    avatarUrl: 'assets/Avtar.png'
  };
}
