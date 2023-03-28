import {
  Component, Input, OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';

@Component({
  selector: 'life-cycle-hooks',
  templateUrl: './life-cycle-hooks.html',
  styleUrls: ['./life-cycle-hooks.css']
})
export class LifeCycleHooks implements OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() title: string;
  @Input() content: string;

  constructor() {
    console.log('LCH Constructor called');
    this.title = "Adv Learning";
    this.content = "Angular Component Life Cycles";
  }

  ngOnChanges() {
    console.log('LCH ngOnChanges called');
  }

  ngOnInit() {
    console.log('LCH ngOnInit called');
  }

  ngDoCheck() {
    console.log('LCH ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('LCH ngAfterContentInit called');
  }

  ngAfterContentChecked() {
    console.log('LCH ngAfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('LCH ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    console.log('LCH ngAfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('LCH ngOnDestroy called');
  }
}
