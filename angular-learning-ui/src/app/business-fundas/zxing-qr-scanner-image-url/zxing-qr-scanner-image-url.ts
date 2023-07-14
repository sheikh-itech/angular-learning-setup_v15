import { Component} from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/library';
import { environment } from '../../../environments/environment';
import { Product } from '../../beans/product';
import { CommonService } from '../../common/services/common.service';

@Component({
  selector: 'zxing-qr-scanner-image-url',
  templateUrl: './zxing-qr-scanner-image-url.html',
  styleUrls: ['./zxing-qr-scanner-image-url.css']
})
export class ZXingQrScannerImageUrl {

  errMsg!: string;
  product: Product;
  productId: any;
  productName: any;
  allQrInfo: any;

  qrCodeInfo = [] as any;

  private codeReader: BrowserQRCodeReader;

  constructor(private http: CommonService) {
    this.product = new Product();
    this.codeReader = new BrowserQRCodeReader();
  }

  readBarcodeImage(imageUrl: string, count: number): void {

    const image = new Image();
    image.src = imageUrl;
    
    image.onerror = (err) => {
      console.error('Failed to load image:', err);
    };
    
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context?.drawImage(image, 0, 0, image.width, image.height);

      this.codeReader.decodeFromImageElement(image)
        .then(result => {
          let actualData = result.getText().split('##');
          actualData.forEach(data => {
            let temp = data.split(':');
            this.qrCodeInfo.push({ key: temp[0], value: temp[1] })
          });
          console.log('QR code result:', result.getText());
        })
        .catch(err => {
          console.log(err);
          if(count<=5)
            this.readBarcodeImage(imageUrl, count+1);
        });
    };
  }


  searchAllQRCode(): void {

    this.http.getApi(environment.qrDownloadAll).subscribe(
      resp => {
        resp.data.forEach((info: any) => {
          const byteCharacters = atob(info.qrBytes);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = Array.from(byteNumbers);
          const base64Image = 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, byteArray));
          info.imageUrl = base64Image;
        });
        this.allQrInfo = resp.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
