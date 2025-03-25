import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tab',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tab.html',
    styleUrls: ['./tab.css']
})
export class Tab {

    @Input() title!: string;
    active: boolean = false;
}
