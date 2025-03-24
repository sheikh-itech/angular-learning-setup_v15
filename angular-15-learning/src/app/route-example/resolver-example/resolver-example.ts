import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'resolver-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './resolver-example.html',
    styleUrls: ['./resolver-example.css']
})
export class ResolverExample implements OnInit {

    data: any = {};

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.data = data['resolveHttp']; // Resolved data is available here
        });
    }
}
