import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareReplayCachService {

  private data: Observable<any>;

  constructor(private http: HttpClient) { }

  public getData(url: string): Observable<any> {
    
    if (!this.data) {
      this.data = this.http.get<any>(url)
        .pipe(
          shareReplay(1)
        );
    }
    return this.data;
  }
}
