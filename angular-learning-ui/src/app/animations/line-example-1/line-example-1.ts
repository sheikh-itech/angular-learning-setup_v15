import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'line-example',
  template: `
    <canvas #canvas [ngbTooltip]="tooltip" [tooltipClass]="'my-tooltip-class'"></canvas>
    `,
})
export class LineExample1 implements AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;
  @ViewChild('tooltipTemplate') tooltipTemplate: any;
  tooltip: string;

  points = [[50, 50],
  [70, 80],
  [100, 40],
  [120, 90],
  [150, 50],
  [170, 70],
  [200, 40],
  [220, 80],
  [250, 50],
  [270, 70],
  [300, 40],
  [320, 90],
  [350, 50],
  [370, 70],
  [400, 40],
  [420, 80],
  [450, 50],
  [470, 70],
  [500, 40],
  [520, 90],
  ];

  constructor() { }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    let ctx: any;
    ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(this.points[0][0], this.points[0][1]);

    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i][0], this.points[i][1]);
    }

    ctx.stroke();

    canvas.addEventListener('mousemove', (event) => {
      const x = event.offsetX;
      const y = event.offsetY;

      for (let i = 0; i < this.points.length; i++) {
        const px = this.points[i][0];
        const py = this.points[i][1];

        if (Math.abs(px - x) <= 15 && Math.abs(py - y) <= 15) {
          this.tooltip = `Point ${i + 1}: (${px}, ${py})`;
          break;
        } else {
          this.tooltip = '';
        }
      }
    });
  }
}
