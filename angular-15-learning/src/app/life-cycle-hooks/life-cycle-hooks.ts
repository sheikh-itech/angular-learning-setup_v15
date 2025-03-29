import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeCycleHooksChild } from '../life-cycle-hooks-child/life-cycle-hooks-child';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'life-cycle-hooks',
    standalone: true,
    imports: [CommonModule, FormsModule, LifeCycleHooksChild],
    templateUrl: './life-cycle-hooks.html',
    styleUrls: ['./life-cycle-hooks.css']
})
export class LifeCycleHooks {

    showComponent = true;
    inputValue: string = 'Initial value';

    toggleComponent() {
        this.showComponent = !this.showComponent;
    }
}
