import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child } from '../content-child/child';

@Component({
    selector: 'content-child-parent',
    standalone: true,
    imports: [CommonModule, Child],
    templateUrl: './content-child-parent.html',
    styleUrls: ['./content-child-parent.css']
})
export class ContentChildParent implements AfterContentInit {

    // Access the projected child component
    @ContentChild(Child, {static: false}) child!: Child;

    ngAfterContentInit() {
        console.log('Projected Child:', this.child);
    }

    logChild() {
        console.log('Child Message:', this.child.message);
    }
}
