import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_IMPORTS } from 'src/app/shared-module-imports';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'parent-component',
    standalone: true,
    imports: [CommonModule, SHARED_IMPORTS],
    templateUrl: './parent-component.html',
    styleUrls: ['./parent-component.css']
})
export class ParentComponent implements OnInit {

    id = "";
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

}
