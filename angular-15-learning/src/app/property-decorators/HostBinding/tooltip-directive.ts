import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[tooltip]',
    standalone: true
})
export class TooltipDirective {

    @Input('tooltip') tooltipText!: string;

    @HostBinding('class.tooltip-active') isActive = false;  // Dynamically bind class
    @HostBinding('style.backgroundColor') backgroundColor = 'transparent';  // Style binding
    @HostBinding('attr.data-tooltip') get dataTooltip() { return this.tooltipText; }  // Attribute binding

    @HostListener('mouseenter') onMouseEnter() {
        this.isActive = true;
        this.backgroundColor = 'lightgreen';  // Change background on hover
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.isActive = false;
        this.backgroundColor = 'transparent';  // Reset background on leave
    }
}
