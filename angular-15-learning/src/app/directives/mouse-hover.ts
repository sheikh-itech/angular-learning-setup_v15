import { Directive, Input } from '@angular/core';
import { AttributeDirective } from './custom/attribute-directive';
import { FancyText } from './fancy-text';

@Directive({
    standalone: true,
    selector: '[mouseHover]',
    hostDirectives: [{
        directive: AttributeDirective,
        inputs: ['directiveColor', 'fontType']

    }, {
        directive: FancyText,
        inputs: ['fontFamily', 'fontSize', 'textColor']  // Map 'condition' to 'structuralDirective'
    }]
})
export class MouseHoverDirective {

    constructor() { }

}
