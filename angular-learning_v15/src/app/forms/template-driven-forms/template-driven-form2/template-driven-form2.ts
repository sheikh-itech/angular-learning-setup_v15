import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'template-driven-form2',
  templateUrl: './template-driven-form2.html',
  styleUrls: ['./template-driven-form2.css']
})
export class TemplateDrivenForm2 {

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      myField: ['', [Validators.required, customValidator]]
    });
  }

  submitForm(): void {
    console.log(this.form.value);
  }
}

function customValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;

  if (value !== undefined && (isNaN(value) || value < 0 || value > 10)) {
    return { 'customValidator': true };
  }

  return null;
}
