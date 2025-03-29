import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-content-child4',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ng-content-child4.html',
    styleUrls: ['./ng-content-child4.css']
})
export class NgContentChild4 {

    // Controlled by the parent
    @Input() showContent!: boolean;
}
