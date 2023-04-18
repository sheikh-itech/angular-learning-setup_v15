import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data/DataService';


@NgModule({
  imports: [CommonModule],
  providers: [DataService], // <-- provide DataService and LoggerService at NgModule level
})
export class NgModuleLevel { }
