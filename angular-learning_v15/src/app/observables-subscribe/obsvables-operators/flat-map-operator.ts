import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'flat-map-operator',
  styles: ['p { color:red; }'],
  template: `
    <h2> Flat Map Operator </h2>
    <p>See console for more</p>
  `
})
export class FlatMapOperator implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

    // Observable that emits list of Cities Id
    const citiesIdObservable = this.http.get<any>(environment.cityIds);

    const cityNamesObservable = citiesIdObservable.pipe(
      flatMap(cityIdsResp => {
        const requests = cityIdsResp.data.map((id: number) => this.http.get<any>(environment.cityNameById + id));
        // ForkJoin returns Observable chich join's responses for all cities name
        return forkJoin(requests);
      })
    );

    console.log('City names with id');
    cityNamesObservable.subscribe((resp: any) => {
      resp.forEach((city: any) => {
        console.log(city.data + ' - ' + city.message);
      })
    });
  }
}
