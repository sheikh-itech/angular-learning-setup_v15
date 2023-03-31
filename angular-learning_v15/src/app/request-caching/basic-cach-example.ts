import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShareReplayCachService } from './share-replay-cach-service';

@Component({
  selector: 'http-get',
  styles: [''],
  template: '<div> Basic Cach Example </div>'
})
export class BasicCachExample implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private cachService: ShareReplayCachService) {  }

  ngOnInit() {
    console.log("First network call")
    this.subscription = this.cachService.getData(environment.getUrl)
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

  private makeDuplicateCall() {
    console.log("Second network call, may use cach")
    this.cachService.getData(environment.getUrl)
      .subscribe(
        resp => {
          console.log(resp)
        },
        err => {
          console.log(err)
        }
    ).unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
