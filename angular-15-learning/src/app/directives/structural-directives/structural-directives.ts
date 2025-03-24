import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'structural-directives',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './structural-directives.html',
    styleUrls: ['./structural-directives.css']
})
export class StructuralDirectives {

    showMessage = false;
    fruits = ['Apple', 'Banana', 'Mango', 'Orange'];
    selectedTheme1 = 'light';
    selectedTheme2 = 'light';
    themeControl = new FormControl('light');

    toggleMessage() {
        this.showMessage = !this.showMessage;
    }

    onThemeChange(event: Event) {
        this.selectedTheme2 = (event.target as HTMLSelectElement).value;
    }
}

/*
Breakdown
=========
*ngIf → Toggles a message when clicking the button.
*ngFor → Loops through an array of fruits and displays them.
*ngSwitch → Changes the displayed theme based on the selected option.
*/