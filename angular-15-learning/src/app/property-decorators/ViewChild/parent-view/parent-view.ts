import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildView } from '../child-view/child-view';
import { HighlightDirective } from '../high-light-directive';

@Component({
    selector: 'parent-view',
    standalone: true,
    imports: [CommonModule, ChildView, HighlightDirective],
    templateUrl: './parent-view.html',
    styleUrls: ['./parent-view.css']
})
export class ParentView implements AfterViewInit {

    @ViewChild('childRef') child!: ChildView;  // Access child component
    @ViewChild('inputElement') input!: ElementRef;  // Access DOM element
    @ViewChild(HighlightDirective, { static: false }) highlight!: HighlightDirective;

    //@ViewChild('childRef', {static: false}) child!: ChildView;  // Access child component

    message: string = '';

    ngAfterViewInit() {

        //Modify DOM element
        this.input.nativeElement.value = 'Initialized!';

        //Using directive with ViewChild
        this.highlight.highlight('yellow');
    }

    accessChild() {
        this.message = this.child.sayHello();
    }

    changeInput() {
        this.input.nativeElement.value = 'Value Changed!';
    }

    changeColor() {
        this.highlight.highlight('lightblue');
    }
}
