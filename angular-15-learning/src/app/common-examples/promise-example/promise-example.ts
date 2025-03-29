import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'promise-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './promise-example.html',
    styleUrls: ['./promise-example.css']
})
export class PromiseExample implements OnInit {

    promiseResponse: string = '';

    ngOnInit(): void {
        
        this.executePromise();
    }

    fetchUser(): Promise<string> {

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                let success = Math.random() > 0.3; // Simulate 70% success

                if (success) {
                    resolve('User data fetched successfully!');
                } else {
                    reject('Failed to fetch user data');
                }
            }, 2000);
        });
    }

    executePromise(): void {

        this.fetchUser()
            .then(response => {   // Handle success
                this.promiseResponse = response;
            })
            .catch(error => {   // Handle error
                this.promiseResponse = error;
            })
            .finally(() => {    // Runs always
                setTimeout(() => { this.promiseResponse = 'Promise execution finished' }, 5000);
            });
    }
}
