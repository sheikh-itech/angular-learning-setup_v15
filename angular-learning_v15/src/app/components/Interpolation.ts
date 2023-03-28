import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-greeting',
  template: '<h1>Hello {{ name }}!</h1><br/>'+
    '<div style="color:red;font-size:25px;"> {{ routeData }} </div>'
})
export class Interpolation implements OnInit {

  name = 'Arham Vahleen';
  routeData: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeData = this.route.snapshot.paramMap.get('routeData');      
  }
}
