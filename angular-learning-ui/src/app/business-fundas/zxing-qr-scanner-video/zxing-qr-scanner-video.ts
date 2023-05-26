import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BrowserQRCodeReader, NotFoundException } from '@zxing/library';

@Component({
  selector: 'qr-zxing-scanner-video',
  templateUrl: './zxing-qr-scanner-video.html',
  styleUrls: ['./zxing-qr-scanner-video.css']
})
export class ZXingQRScannerVideo implements AfterViewInit {

  qrCodeInfo = [] as any;

  private videoEle: HTMLVideoElement;
  private codeReader: BrowserQRCodeReader;

  @ViewChild('videoElement') videoElement: ElementRef;
  
  ngAfterViewInit(): void {
    this.codeReader = new BrowserQRCodeReader();
    this.videoEle = this.videoElement.nativeElement as HTMLVideoElement;
  }

  startScanner() {
    //Passing Camera/Video Source Here
    this.codeReader.decodeFromVideoDevice(null, this.videoEle, (result, error) => {
      if (result) {
        let actualData = result.getText().split('##');
        actualData.forEach(data => {
          let temp = data.split(':');
          this.qrCodeInfo.push({ key: temp[0], value: temp[1] })
        });
      }
      if (error && !(error instanceof NotFoundException)) {
        console.error('QR code scanning error:', error);
        // Handle any errors that occur during scanning
      }
    })
    .catch(err => {
      console.error('Failed to start QR code scanner:', err);
      // Handle any errors that occur during initialization
    });
  }

  stopScanner() {

    this.codeReader.stopContinuousDecode();

    const stream = this.videoElement.nativeElement.srcObject;
    if (!stream) {
      return;
    }
    const tracks = stream.getTracks();
    tracks.forEach((track: any) => track.stop());
    this.videoElement.nativeElement.srcObject = null;
  }
}
