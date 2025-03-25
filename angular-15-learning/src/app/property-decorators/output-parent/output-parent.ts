import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputChild } from '../output-child/output-child';
import { OutputChildMultipleValues } from '../output-child-multiple-values/output-child-multiple-values';
import { OutputChildCustom } from '../output-child-custom/output-child-custom';
import { OutputChildAsync } from '../output-child-async/output-child-async';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'output-parent',
    standalone: true,
    imports: [CommonModule, FormsModule, OutputChild, OutputChildMultipleValues, OutputChildCustom, OutputChildAsync
    ],
    templateUrl: './output-parent.html',
    styleUrls: ['./output-parent.css']
})
export class OutputParent {

    message1: any;
    message2: any;
    message3: any;
    message4: any;

    receiveMessage1(data: any) {
        this.message1 = data;  // Receiving emitted data
    }

    receiveMessage2(data: any) {
        this.message2 = data;
    }

    receiveMessage3(data: any) {
        this.message3 = data;
    }

    receiveMessage4(data: any) {
        this.message4 = data;
    }
}
