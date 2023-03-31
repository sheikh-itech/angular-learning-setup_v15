import { Component, Injectable, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTooltip, ApexStroke
} from "ng-apexcharts";

// import of NgApexchartsModule Required for Apex chart
// provider ChartComponent required

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ng-apex-spline-chart',
  templateUrl: './ng-apex-spline-chart.html',
  styleUrls: ['./ng-apex-spline-chart.css']
})
export class NgApexSplineChart implements OnInit {

  public chartOptions!: Partial<ChartOptions> | any;
  private chartData = [];
  public category = [];
  public showChart = false;
  public previous = '';
  constructor() {   }

  private initChart() {
    return {
      series: this.chartData,
      chart: {
        height: 450,
        type: "area",
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: '<img style="width: 18px !important;height: 18px !important;padding-top: 5px !important;" src="assets/icons/reset-icon.png" width="20">',
            customIcons: []
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "date",
        categories: this.category,
        labels: {
          show: false,
          rotate: -90,
          rotateAlways: true,
          format: "yyyy"
          /*formatter: function (value: any) {
            return value;
          }*/
        },
        convertedCatToNumeric: false
      },      
      tooltip: {
        x: {
          format: "dd-mm-yyyy"
        }
      }
    };
  }
  public updateData(data: any, years: any) {
    //this.category = years.slice(0, 50);
    this.chartOptions = this.initChart();  
    if (years != null) {
      this.chartOptions.xaxis.categories = years;
      
      this.chartOptions.xaxis.convertedCatToNumeric = false;
    }
    this.chartOptions.series = data;
    //this.chartOptions.series[0].data = data[0].data.slice(0, 50);
    console.log(this.chartOptions);
    this.showChart = true;
  }

  ngOnInit(): void {

  }
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
