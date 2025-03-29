import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
    selector: 'observable-subject-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './subject-example.html',
    styleUrls: ['./subject-example.css']
})
export class SubjectExample {

    private subject = new Subject<string>();

    messages: { subscriber: string; message: string }[] = [];

    subscribe(): void {

        // First subscriber
        this.subject.subscribe(data => {
            
            this.messages.push({
                subscriber: 'First Subscriber',
                message: data
            });
        });

        // Second subscriber
        this.subject.subscribe(data => {
            
            this.messages.push({
                subscriber: 'Second Subscriber',
                message: data
            });
        });
    }

    ngOnInit(): void {

        this.subscribe();

        // Emit values
        this.subject.next('First Emission- Subject emits!');
        setTimeout(() => this.subject.next('Second Emission- Subject emits again!'), 4000);
    }
}
