import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'template-driven-form3',
  templateUrl: './template-driven-form3.html',
  styleUrls: ['./template-driven-form3.css']
})
export class TemplateDrivenForm3 {

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      items: new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.min(1))
        }),
        new FormGroup({
          name: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.min(1))
        })
      ])
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
