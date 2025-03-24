import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'truncate'
})
export class CustomPipe implements PipeTransform {

    transform(value: string, limit: number = 20, completeWords: boolean = false, ellipsis: string = '...'): string {
        if (!value || value.length <= limit) {
            return value;
        }
        if (completeWords) {
            limit = value.substr(0, limit).lastIndexOf(' ');
        }
        return `${value.substr(0, limit)}${ellipsis}`;
    }
}

//<p>{{ 'This is a long sentence that needs truncating' | truncate:25:true }}</p>
//Output: This is a long sentence...
