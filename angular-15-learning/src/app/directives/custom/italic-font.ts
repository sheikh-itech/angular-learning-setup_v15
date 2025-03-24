import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[italicFont]',
  standalone: true
})
export class ItalicFontDirective {

  constructor(private el: ElementRef<HTMLElement>) { }

  @HostListener('mouseenter') onMouseEnter() {
          this.el.nativeElement.style.fontSize = '25px';
          this.el.nativeElement.style.fontFamily = 'italic';
      }
  
      @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.style.fontSize = '15px';
        this.el.nativeElement.style.fontFamily = 'normal';
      }

}
