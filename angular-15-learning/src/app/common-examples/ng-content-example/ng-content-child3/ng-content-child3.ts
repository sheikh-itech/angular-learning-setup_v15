import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-content-child3',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ng-content-child3.html',
    styleUrls: ['./ng-content-child3.css']
})
export class NgContentChild3 {

    // Controlled by the parent
    @Input() isVisible!: boolean;
}
