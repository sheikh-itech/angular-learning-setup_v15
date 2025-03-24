import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'component-directive',
    template: `<h1>Hello, Angular Component Directive!</h1>`,
    styles: [`h1 { color: blue; font-family: Arial; }`]
})
export class ComponentDirective {

    constructor() { }

}
