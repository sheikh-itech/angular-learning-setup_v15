import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'line-example',
  template: '<canvas #canvas></canvas>',
  styles: [`
    canvas {
      background-color: lightblue;
    }
  `]
})
export class LineExample implements AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    let ctx: any;
    ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 150);
    ctx.stroke();
  }
}
