import { Component, ViewChild } from '@angular/core';
import { GraphData } from './graph-data';
import { NgApexSplineChart } from './ng-apex-spline-chart/ng-apex-spline-chart';

@Component({
  selector: 'apex-chart-example',
  templateUrl: './apex-chart-example.html'
})
export class ApexChartExample {

  showChart = false;

  @ViewChild(NgApexSplineChart, { static: false }) child: NgApexSplineChart;

  constructor(private chartEl: NgApexSplineChart) {

    this.showChart = true;
    this.child = chartEl;
  }

  public updateChartData(): void {

    this.child.updateData(GraphData.data, GraphData.days);
  }
}
