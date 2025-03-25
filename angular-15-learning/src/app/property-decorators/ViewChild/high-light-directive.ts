import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {

    constructor(private el: ElementRef) { }

    highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }

}
