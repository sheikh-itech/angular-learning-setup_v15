import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphData } from './graph-data';
import { NgApexSplineChart } from './ng-apex-spline-chart/ng-apex-spline-chart';

@Component({
  selector: 'apex-chart-example',
  styleUrls: [''],
  templateUrl: './apex-chart-example.html'
})
export class ApexChartExample implements OnInit {

  showChart = false;
  private graphData: any;

  @ViewChild(NgApexSplineChart, { static: false }) child: NgApexSplineChart;

  constructor(private chartEl: NgApexSplineChart) {

    this.showChart = true;
    this.child = chartEl;
  }

  public updateChartData(): void {

    let resData = [] as any;
    let years = [] as any;
    GraphData
    years = this.graphData.days
    resData = this.graphData.data;

    this.child.updateData(resData, years);
  }

  ngOnInit(): void {
    this.graphData  = JSON.parse(GraphData);
  }
}
