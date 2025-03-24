import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[attributeDirective]'
})
export class AttributeDirective {

    /*  fontType is input type from directive call 
        attributeDirective is also input with default value 'yello' */
        
    @Input() directiveColor = 'yellow';
    @Input() fontType = 'cursive';

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.el.nativeElement.style.backgroundColor = this.directiveColor;
        this.el.nativeElement.style.fontFamily=this.fontType;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.style.backgroundColor = 'transparent';
        this.el.nativeElement.style.fontFamily='cursive';
    }

}
