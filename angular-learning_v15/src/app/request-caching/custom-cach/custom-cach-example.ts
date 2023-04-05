import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CustomCachService } from './custom-cach-service';

@Component({
  selector: 'custom-cach',
  templateUrl: './custom-cach-example.html',
  styles: ['']
})
export class CustomCachExample {

  constructor(private cachService: CustomCachService) {  }

  options = {
    headers: {
      'Authorization': 'Auth Header'
    },
    params: {
      name: "Arham vahleen"
    },
    withCredentials: false
  };

  payload = {
    name: "Arham Vahleen",
    age: "1 year"
  };


  firstGetCall() {
    let resp = this.cachService.getData(environment.getUrl, this.options);
    console.log(resp);
  }

  secondGetCall() {
    let resp = this.cachService.getData(environment.getUrl, this.options);
    console.log(resp);
  }

  thirdGetCall() {
    let resp = this.cachService.getData(environment.getUrl, this.options);
    console.log(resp);
  }

  firstPostCall() {
    
    let resp = this.cachService.postData(environment.getUrl, this.payload, this.options);
    console.log(resp);
  }

  secondPostCall() {
    this.payload.age = "1.5 year";
    let resp = this.cachService.postData(environment.getUrl, this.payload, this.options);
    console.log(resp);
  }
}
