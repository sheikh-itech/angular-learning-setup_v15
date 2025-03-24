import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[structuralDirective]'
})
export class StructuralDirective {

    @Input() set structuralDirective(condition: boolean) {
        if (condition) {
            this.vcRef.createEmbeddedView(this.templateRef);
        } else {
            this.vcRef.clear();
        }
    }

    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}
