import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'adv-life-cycle',
  templateUrl: './adv-life-cycle.html',
  styleUrls: ['./adv-life-cycle.css']
})
export class AdvLifeCycle implements OnChanges {

  @Input() placeholder: string;
  @Input() searchResults: string[];

  constructor() {
    console.log('Adv constructor');
    this.searchResults = ['Apple', 'Banana', 'Cherry', 'Durian'];
    this.placeholder = "Search fruits";
  }

  control = new FormControl();
  results: string[];
  showResults = false;

  ngOnChanges(changes: SimpleChanges) {
    console.log('Adv ngOnChanges');
    if (changes['searchResults']) {
      this.results = changes['searchResults'].currentValue;
    }
  }

  ngOnInit() {
    console.log('Adv ngOnInit');
    this.control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.results = this.searchResults.filter((result: string) => {
        return result.toLowerCase().includes(value.toLowerCase());
      });
      this.showResults = true;
    });
  }

  ngOnDestroy() {
    console.log('Adv ngOnDestroy');
    //this.control.valueChanges.unsubscribe();
    this.control.valueChanges.subscribe();
  }

  hideResults() {
    this.showResults = false;
  }
}
