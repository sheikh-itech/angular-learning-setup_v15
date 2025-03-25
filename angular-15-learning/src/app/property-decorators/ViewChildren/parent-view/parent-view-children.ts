import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildView } from '../child-view/child-view';

@Component({
    selector: 'parent-view',
    standalone: true,
    imports: [CommonModule, ChildView],
    templateUrl: './parent-view.html',
    styleUrls: ['./parent-view.css']
})
export class ParentViewChildren implements AfterViewInit {

    names = ['Alice', 'Bob', 'Charlie'];

    // ViewChildren to access all instances of ChildComponent
    @ViewChildren(ChildView) children!: QueryList<ChildView>;

    ngAfterViewInit() {
        // Log all child components
        console.log('Child Components:', this.children.toArray());
    }

    logChildComponents() {
        this.children.forEach((child, index) => {
            console.log(`Child ${index + 1}:`, child.name);
        });
    }

    changeNames() {
        // Modify the name of each child component
        this.children.forEach((child, index) => {
            child.name = `Updated ${index + 1}`;
        });
    }
}
