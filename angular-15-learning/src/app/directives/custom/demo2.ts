import { Component } from '@angular/core';
import { AttributeDirective } from './attribute-directive';
import { ItalicFontDirective } from './italic-font';

@Component({
    standalone: true,
    selector: 'demo2',
    template: `<div><p directiveColor="lightblue" italicFont>Attribute Directive:- Hover over me to see the effect</p></div>`,
    imports: [AttributeDirective, ItalicFontDirective]
})
export class Demo2 {

    constructor() { }

}
