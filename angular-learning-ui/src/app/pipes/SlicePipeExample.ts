import { Component } from '@angular/core';

@Component({
  selector: 'slicep-pipe',
  template: `
            <div>Complete elements: {{collection}}</div>
            Slice 1:3
            <ul>
              <li *ngFor="let i of collection | slice:1:3">{{i}}</li>
            </ul>`
})
export class SlicePipeExample {
    
    collection: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


}
