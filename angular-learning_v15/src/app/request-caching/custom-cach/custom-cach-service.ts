import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utility } from '../../common/services/utility';

@Injectable({
  providedIn: 'root'
})
export class CustomCachService {

  private static cachData: any = [];
  private static http: HttpClient;

  constructor(private http: HttpClient) {
    CustomCachService.http = this.http;
  }

  public getData(url: string, options: any): any {

    let outcome: any;

    if (CustomCachService.cachData.length == 0)
      return this.getHttpCall(url, options);
    else {

      outcome = CustomCachService.filterCachData(url, options);
      if (!outcome)
        return this.getHttpCall(url, options);
      else
        return outcome;
    }
  }

  public postData(url: string, payload: any, options: any): any {
 
    let outcome: any;

    if (!CustomCachService.cachData)
      outcome = this.postHttpCall(url, payload, options);
    else {

      outcome = CustomCachService.filterCachData(url, options);
      if (!outcome)
        outcome = this.postHttpCall(url, payload, options);
    }
    return outcome;
  }

  private postHttpCall(url: string, payload: any, options: any): any {
    CustomCachService.http.post(url, payload, options).subscribe(
      (resp: any) => {
        CustomCachService.addToCach(url, options, resp);
        return resp;
      },
      err => {
        return undefined;
      }
    )
  }

  private getHttpCall(url: string, options: any): any {

    this.http.get(url, options)
      .subscribe(
        (resp: any) => {
          CustomCachService.addToCach(url, options, resp);
          return resp;
        },
        err => {
          console.log(err);
          return undefined;
        }
      )
  }

  private static addToCach(url: any, options: any, outcome: any) {
    let cachMap = new CachMap();
    cachMap.url = url;
    cachMap.options = options;
    cachMap.data = outcome;
    CustomCachService.cachData.push(cachMap);
  }

  private static filterCachData(url: any, options: any): any {

    for (let i = 0; i < CustomCachService.cachData.length; i++) {
      if (url == CustomCachService.cachData[i].url) {
        let flag = Utility.checkObjectsEquality(options, CustomCachService.cachData[i].options);
        if (flag)
          return CustomCachService.cachData[i].data;
      }
    }
    return undefined;
  }
}

class CachMap {
  url: string;
  options: any;
  data: any;
}
