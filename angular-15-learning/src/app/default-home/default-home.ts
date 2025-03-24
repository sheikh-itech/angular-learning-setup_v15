import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../shared-module-imports';

@Component({
    selector: 'default-home',
    templateUrl: './default-home.html',
    styleUrls: ['./default-home.css'],
    standalone: true,
    imports: [SHARED_IMPORTS], //Use SHARED_IMPORTS for multiple import stataments
})
export class AngularDefaultHomePage {

    title = 'angular-15-learning';
}
