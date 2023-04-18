import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-form1',
  templateUrl: './reactive-form1.html',
  styleUrls: ['./reactive-form1.css']
})
export class ReactiveForm1 {

  productForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }
}
