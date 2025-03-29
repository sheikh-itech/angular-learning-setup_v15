import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'async-await-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './async-await-example.html',
  styleUrls: ['./async-await-example.css']
})
export class AsyncAwaitExample implements OnInit {

    response: any = '';

    ngOnInit(): void {
        
        this.getUserData().then(data => {
            this.response = data; // Store the resolved value
        });
    }

    fetchUser(): Promise<string> {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let success = Math.random() > 0.3; // 70% success
                success ? resolve('User data fetched successfully!') : reject('Failed to fetch user data');
            }, 2000);
        });
    }

    async getUserData() {
        try { 
            return await this.fetchUser();
        } catch (error) {
            return error;
        } finally {
            console.log('Fetch attempt complete!');
        }
    }
}
