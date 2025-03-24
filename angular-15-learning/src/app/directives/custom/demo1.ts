import { Component } from '@angular/core';
import { StructuralDirective } from './structural-directive';
import { ItalicFontDirective } from './italic-font';

@Component({
    standalone: true,
    selector: 'demo1',
    template: `<div *structuralDirective="true" italicFont style="color:red;">Structural Directive- This text appears if condition is true for *structuralDirective</div>`,
    imports: [StructuralDirective, ItalicFontDirective]
})
export class Demo1 {

    constructor() { }

}
