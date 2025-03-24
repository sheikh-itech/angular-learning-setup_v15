import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'attribute-directives',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './attribute-directives.html',
    styleUrls: ['./attribute-directives.css']
})
export class AttributeDirectives {

    isHighlighted = false;
    textClass = 'red-text';
    textColor = 'black';
    textSize = 16;
    isDisabled = false;
    inputPlaceholder = 'Enter text here...';
    hoverText = 'This is a title attribute tooltip';

    toggleHighlight() {
        this.isHighlighted = !this.isHighlighted;
    }

    toggleInput() {
        this.isDisabled = !this.isDisabled;
    }
}
