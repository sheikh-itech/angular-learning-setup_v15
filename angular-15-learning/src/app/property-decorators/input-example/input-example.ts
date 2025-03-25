import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputChildExample } from '../input-child-example/input-child-example';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'input-example',
  standalone: true,
  imports: [CommonModule, InputChildExample],
  templateUrl: './input-example.html',
  styleUrls: ['./input-example.css']
})
export class InputExample implements OnInit {

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

