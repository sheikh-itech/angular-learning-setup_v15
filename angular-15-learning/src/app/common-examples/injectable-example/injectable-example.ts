import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputService } from './input-service';

@Component({
  selector: 'injectable-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './injectable-example.html',
  styleUrls: ['./injectable-example.css']
})
export class InjectableExample  implements OnInit {

    data: any;

    constructor(private inputService: InputService) {}

    ngOnInit(): void {
        
        this.data = this.inputService.getdata();
    }
}
