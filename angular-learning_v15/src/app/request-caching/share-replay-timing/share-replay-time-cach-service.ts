import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, takeUntil, tap, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareReplayTimeCachService {

  private cachedData: Observable<any> | any;
  private cacheTime: number = 5000; // 30 seconds

  constructor(private http: HttpClient) { }

  public getData(url: string): Observable<any> {

    const currentTime = new Date().getTime();
    const refresh$ = timer(this.cacheTime);

    if (!this.cachedData) {
      
      this.cachedData = this.http.get(url).pipe(
        catchError(error => {
          this.cachedData = null;
          return throwError(error);
        }),
        shareReplay(1, this.cacheTime),
        takeUntil(refresh$)
      );
    } else {
      this.cachedData.subscribe((data: any) => {
        const age = currentTime - data.timestamp;
        if (age > this.cacheTime) {
          console.log(`Cached data is too old (${age} ms), fetching from network...`);
          this.cachedData = this.http.get<any>(url)
            .pipe(
              tap(() => console.log('Data fetched from network')),
              shareReplay(1, this.cacheTime),
              takeUntil(refresh$),
            );
        } else {
          console.log(`Returning cached data (${age} ms old)`);
        }
      });
    }
    return this.cachedData;
  }

  clearCache(): void {
    this.cachedData = null;
  }
}
