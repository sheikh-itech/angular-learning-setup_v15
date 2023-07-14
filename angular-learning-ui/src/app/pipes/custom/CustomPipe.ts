import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'CustomPipe'
})
export class CustomPipe implements PipeTransform {
  transform(value: any, arg1: any, arg2: any): any {
    // Perform some transformation on the input value
    return value+arg1+arg2;
  }
}
