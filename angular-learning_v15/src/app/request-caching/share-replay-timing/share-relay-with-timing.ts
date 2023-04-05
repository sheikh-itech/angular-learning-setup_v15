import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ShareReplayTimeCachService } from './share-replay-time-cach-service';

@Component({
  selector: 'http-get',
  styles: [''],
  templateUrl: './custom-cach-example.html',
})
export class ShareRelayWithTiming implements OnInit {

  constructor(private cachService: ShareReplayTimeCachService) {  }

  ngOnInit() {
    console.log("First network call")
    this.cachService.getData(environment.getUrl)
      .subscribe(
          resp => {
            console.log(resp);
            this.makeDuplicateCall();
          },
          err => {
            console.log(err)
            this.makeDuplicateCall();
          }
      );
  }

  makeDuplicateCall() {
    console.log("Duplicate network call, may use cach")
    this.cachService.getData(environment.getUrl)
      .subscribe(
        resp => {
          console.log(resp)
        },
        err => {
          console.log(err)
        }
    );
  }
}
