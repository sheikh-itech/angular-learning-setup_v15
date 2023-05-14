import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Quagga from '@ericblade/quagga2';

@Component({
  selector: 'quagga-barcode-reader',
  templateUrl: './quagga-barcode-reader.html',
  styleUrls: ['./quagga-barcode-reader.css']
})
export class QuaggaBarcodeReader implements AfterViewInit {

  @ViewChild('video') videoElement: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.startCamera();
  }

  startCamera() {

    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user", // Use "environment" for back camera or "user" for front camera
          width: { min: 640 },
          height: { min: 480 },
          aspectRatio: { min: 1, max: 100 }
        }
      })
        .then(stream => {
          this.videoElement.nativeElement.srcObject = stream;
          this.videoElement.nativeElement.play();
        })
        .catch(error => {
          console.log('Error starting the camera: ', error);
        });
    } else {
      console.log('getUserMedia() is not supported by your browser');
    }
  }

  scanBarcode() {

    const stream = this.videoElement.nativeElement.srcObject;
    if (!stream)
      this.startCamera();

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        //target: document.querySelector('#video')||'',
        target: this.videoElement.nativeElement,
        constraints: {
          width: { min: 150 },
          height: { min: 100 },
          aspectRatio: { min: 1, max: 100 },
          facingMode: "user" // or "user" for front camera
          //for front camera "user" or "environment" for back camera
        }
      },
      decoder: {
        //readers: ["ean_reader"] // or other barcode formats you want to support
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader",
          "2of5_reader",
          "code_93_reader"
        ]
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    Quagga.onDetected(result => {
      console.log('Scanned Result: '+result.codeResult.code);
    });
  }

  stopScanner() {
    this.stopCamera();
    Quagga.stop();
    console.log('Scanner Stopped')
  }

  stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject;
    if (!stream) {
      return;
    }
    const tracks = stream.getTracks();
    tracks.forEach((track:any) => track.stop());
    this.videoElement.nativeElement.srcObject = null;
  }

}
