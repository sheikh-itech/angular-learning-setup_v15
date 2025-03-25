import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'output-child-custom',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './output-child-custom.html',
    styleUrls: ['./output-child-custom.css']
})
export class OutputChildCustom {

    @Output() userEvent = new EventEmitter<User>();

    sendUserData() {
        const user: User = { id: 1, name: 'Arham', email: 'arham@example.com' };
        this.userEvent.emit(user);
    }
}

interface User {
    id: number;
    name: string;
    email: string;
}