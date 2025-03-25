import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from '../tab/tab';
import { TabContainer } from '../tab-container/tab-container';

@Component({
  selector: 'tab-container-example',
  standalone: true,
  imports: [CommonModule, Tab, TabContainer],
  templateUrl: './tab-container-example.html',
  styleUrls: ['./tab-container-example.css']
})
export class TabContainerExample {

}
