import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceLevel {
  // <-- inject HttpClient at Service level
  constructor(private http: HttpClient) { }
}
