import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, debounceTime, filter, map, mergeMap, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Component({
    selector: 'observable-with-operators',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './observable-with-operators.html',
    styleUrls: ['./observable-with-operators.css']
})
export class ObservableWithOperators {

    /** Imagine we are building a live search feature with the following requirements:
     * 1. The user types in an input box
     * 2. The search query is debounced (to prevent too many API calls)
     * 3. Only queries with more than 2 characters are processed
     * 4. A simulated API call fetches matching results
     * 5. The results are processed through map() and logged using tap()
     * 6. Use catchError() to handle potential errors gracefully
     * 7. Switch between two different API calls using switchMap() and mergeMap()
     */

    results: string[] = [];
    errorMessage: string = '';

    data = [
        'Angular', 'React', 'Vue', 'Svelte',
        'Next.js', 'Nest.js', 'Express', 'RxJS'
    ];

    // Mock API function
    mockApi(query: string): Observable<string[]> {

        console.log(`API call for: ${query}`);
        if (query === 'error') {
            return throwError(() => new Error('Simulated API error!'));
        }

        

        // Filter results
        const filteredData = this.data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        return of(filteredData);
    }

    onSearch(event: Event): void {
        
        const query = (event.target as HTMLInputElement).value;

        // Create an observable for the input event
        of(query).pipe(
            debounceTime(300),        // Prevent frequent API calls
            filter(text => text.length > 2),  // Filter short queries
            tap(text => console.log('Filtered:', text)), // Debugging

            // Switch to the latest observable
            switchMap(text => this.mockApi(text).pipe(
                map(results => results.map(item => item.toUpperCase())), // Modify the data
                tap(data => console.log('Transformed data:', data)),
                catchError(error => {
                    console.error('Error:', error);
                    this.errorMessage = error.message;
                    return of([]); // Return empty array on error
                })
            )),

            // Merge with another API call
            mergeMap(results => of([...results, 'Extra Data Added']))
        ).subscribe({
            next: (data) => {
                this.results = data;
                this.errorMessage = '';
            },
            error: (error) => {
                this.errorMessage = error.message;
            }
        });
    }
}
