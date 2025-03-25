import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from '../tooltip-directive';

@Component({
    selector: 'host-binding-example',
    standalone: true,
    imports: [CommonModule, TooltipDirective],
    templateUrl: './host-binding-example.html',
    styleUrls: ['./host-binding-example.css']
})
export class HostBindingExample {

    @HostBinding('style.backgroundColor') backgroundColor = 'skyblue';
    @HostBinding('style.color') color = 'white';
    @HostBinding('class.active') isActive = false;

    toggleActive() {
        this.isActive = !this.isActive;
        this.backgroundColor = this.isActive ? 'green' : 'skyblue';
    }
}
