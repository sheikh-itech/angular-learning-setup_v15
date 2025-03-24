import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'simple-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-form.html',
  styleUrls: ['./simple-form.css']
})
export class SimpleForm {

    public isFormDirty(): boolean {

        return true;
    }
}
