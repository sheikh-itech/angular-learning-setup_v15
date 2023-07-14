import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-key-value',
    templateUrl: './key-value.html'
})
export class KeyValueExample {

    constructor() { }

    //The interface KeyValue<K, V> represents a key-value pair in TypeScript

    pair1: KeyValue<string, number> = { key: 'age', value: 25 };
    pair2: KeyValue<number, boolean> = { key: 42, value: true };

}
