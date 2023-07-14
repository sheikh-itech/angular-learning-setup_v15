import { HttpEventType, HttpUserEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonService } from '../../common/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-http-user-event',
  templateUrl: './http-user-events.html',
  styleUrls: ['./http-user-events.css']
})
export class HttpUserEventsExample {

    constructor(private http: CommonService) { }

    private userEvent: HttpUserEvent<string> = {
        type: HttpEventType.User
    };

    httpEvent(): void {

        // Emit the user-defined event
        this.http.getApi(environment.httpEvent, { observe: 'events', responseType: 'json' }).subscribe({
            next: (event) => {
                if (event.type === HttpEventType.Response) {
                    console.log('Event response: ', event);
                } else if (event.type === HttpEventType.User) {
                    console.log('User-defined event received: ', event);
                } else {
                    console.log('Normal event resp: ', event);
                }
            },
            error: (error) => {
                console.log('Event error: ', error);
            },
            complete: () => {
                console.log('Http Event complete, check server console');
            }
        });
    }
}
