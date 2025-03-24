import { Component } from '@angular/core';
import { MouseHoverDirective } from '../mouse-hover';

@Component({
    standalone: true,
    selector: 'combined-directives',
    templateUrl: './combined-directives-demo.html',
    styleUrls: ['./combined-directives-demo.css'],
    imports: [MouseHoverDirective]
})
export class CombinedDirectivesDemo {

}
