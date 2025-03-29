import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'life-cycle-hooks-child',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './life-cycle-hooks-child.html',
    styleUrls: ['./life-cycle-hooks-child.css']
})
export class LifeCycleHooksChild implements OnInit, OnChanges, DoCheck, AfterContentInit,
    AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

    @Input() sampleInput: string = '';  // Input property to trigger `ngOnChanges`

    constructor() {
        console.log('Constructor called!');
    }

    // Called before ngOnInit when input property changes
    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges:', changes);
    }

    // Called once after first ngOnChanges
    ngOnInit(): void {
        console.log('ngOnInit called!');
    }

    // Called during every change detection run
    ngDoCheck(): void {
        console.log('ngDoCheck called!');
    }

    // Called once after content projection is initialized
    ngAfterContentInit(): void {
        console.log('ngAfterContentInit called!');
    }

    // Called after content projection is checked during each change detection cycle
    ngAfterContentChecked(): void {
        console.log('ngAfterContentChecked called!');
    }

    // Called once after the component’s view is initialized
    ngAfterViewInit(): void {
        console.log('ngAfterViewInit called!');
    }

    // Called after the component’s view is checked during every change detection
    ngAfterViewChecked(): void {
        console.log('ngAfterViewChecked called!');
    }

    // Called once before the component is destroyed
    ngOnDestroy(): void {
        console.log('ngOnDestroy called!');
    }
}
