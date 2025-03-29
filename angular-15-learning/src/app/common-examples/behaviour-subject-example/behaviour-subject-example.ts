import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'observable-behaviour-subject-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './behaviour-subject-example.html',
    styleUrls: ['./behaviour-subject-example.css']
})
export class BehaviourSubjectExample implements OnInit {

    private behaviorSubject = new BehaviorSubject<string>('Initial Value');

    messages: { subscriber: string; message: string }[] = [];

    subscribe() {

        // First subscriber - receives the initial value immediately
        this.behaviorSubject.subscribe(data => {

            this.messages.push({
                subscriber: 'First Subscriber',
                message: data
            });
        });        

        // Second subscriber - receives the latest value immediately
        this.behaviorSubject.subscribe(data => {

            this.messages.push({
                subscriber: 'Second Subscriber',
                message: data
            });
        });
    }

    ngOnInit(): void {

        this.subscribe();

        // Emit a new value
        setTimeout(()=> this.behaviorSubject.next('Updated Value'), 3000);

        // Emit another value
        setTimeout(()=> this.behaviorSubject.next('Final Value'), 5000);
    }
}
