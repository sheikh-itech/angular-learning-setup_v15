import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-content-child5',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ng-content-child5.html',
    styleUrls: ['./ng-content-child5.css']
})
export class NgContentChild5 {

    // Controlled by the parent
    @Input() isHighlighted!: boolean;
}
