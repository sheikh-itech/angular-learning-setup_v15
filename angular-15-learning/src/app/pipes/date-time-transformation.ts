import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateTimeTransformation',
    standalone: true
})
export class DateTimeTransformation implements PipeTransform {

    transform(value: string | Date, format: string = 'short'): string {
        
        if (!value) return '';

        let date = new Date(value);
        if (isNaN(date.getTime())) return 'Invalid date';

        switch (format) {
            case 'short':
                return date.toLocaleDateString();
            case 'medium':
                return date.toLocaleString();
            case 'long':
                return date.toDateString() + ' ' + date.toLocaleTimeString();
            default:
                return date.toString();
        }
    }
}

// Usage in HTML
// <p>{{ '2025-02-17T10:30:00' | dateTimeTransform:'short' }}</p>
// <p>{{ '2025-02-17T10:30:00' | dateTimeTransform:'medium' }}</p>
// <p>{{ '2025-02-17T10:30:00' | dateTimeTransform:'long' }}</p>
