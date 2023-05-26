import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BrowserQRCodeReader, NotFoundException, Result } from '@zxing/library';

@Component({
  selector: 'app-zxing-qr-scanner-image',
  templateUrl: './zxing-qr-scanner-image.html',
  styleUrls: ['./zxing-qr-scanner-image.css']
})
export class ZXingQrScannerImage implements AfterViewInit {

  streamVideo = true;
  imageSrc: string | undefined;

  qrCodeInfo = [] as any;

  private videoEle: HTMLVideoElement;
  private codeReader: BrowserQRCodeReader;

  @ViewChild('videoElement') videoElement: ElementRef;

  ngAfterViewInit(): void {
    this.codeReader = new BrowserQRCodeReader();
    this.videoEle = this.videoElement.nativeElement as HTMLVideoElement;
  }

  startScanner() {
    const constraints = {
      video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        this.videoEle.srcObject = stream;
        this.videoEle.play();
        this.streamVideo = true;
        this.imageSrc = undefined;
      })
      .catch(err => {
        console.error('Failed to access camera:', err);
        // Handle any errors that occur when accessing the camera
      });
  }

  captureImage() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoEle.videoWidth;
    canvas.height = this.videoEle.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(this.videoEle, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL();
    
    this.decodeImage(imageDataUrl)
      .then(result => {
        let actualData = result.getText().split('##');
        actualData.forEach(data => {
          let temp = data.split(':');
          this.qrCodeInfo.push({ key: temp[0], value: temp[1] })
        });
        console.log('QR code result:', result.getText());
        // Do something with the decoded QR code data
      })
      .catch(err => {
        if (!(err instanceof NotFoundException)) {
          console.error('QR code scanning error:', err);
          // Handle any errors that occur during scanning
        }
      });
  }

  private decodeImage(imageDataUrl: string): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context?.drawImage(image, 0, 0, image.width, image.height);
        this.codeReader.decodeFromImageElement(image)
          .then(result => {
            this.streamVideo = false;
            this.imageSrc = imageDataUrl;
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      };
      image.onerror = (err) => {
        reject(err);
      };
      image.src = imageDataUrl;
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
    //this.streamVideo = true;
    //this.imageSrc = undefined;
  }
}
