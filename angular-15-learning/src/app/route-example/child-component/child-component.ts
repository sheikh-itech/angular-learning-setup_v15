import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'child-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './child-component.html',
    styleUrls: ['./child-component.css']
})
export class ChildComponent implements OnInit {

    childId = "";
    parentId = "";
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {

        this.route.parent?.params.subscribe(params => {
            this.parentId = params['id'];
        });

        this.route.params.subscribe(params => {
            this.childId = params['childId'];
        });
    }
}
