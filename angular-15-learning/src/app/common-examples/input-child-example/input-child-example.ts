import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'input-child-example',
    standalone: true,
    templateUrl: './input-child-example.html',
    styleUrls: ['./input-child-example.css']
})
export class InputChildExample implements OnInit {

    @Input() title: string = '';
    @Input() count: number = 0;

    constructor(private route: ActivatedRoute) { }

    /* Without NgModule- We need to subscribe route params for @Input */

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.title = params['title'];
            this.count = +params['count'];  // ✅ Convert string to number
        });
    }
}
