import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[attributeDirective1]'
})
export class FancyText implements OnInit {

    @Input() fontFamily: string = 'cursive'; // Default font
    @Input() fontSize: string = '20px'; // Default font size
    @Input() textColor: string = 'purple'; // Default text color

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
        this.renderer.setStyle(this.el.nativeElement, 'font-family', this.fontFamily);
        this.renderer.setStyle(this.el.nativeElement, 'font-size', this.fontSize);
        this.renderer.setStyle(this.el.nativeElement, 'color', this.textColor);
    }
}
