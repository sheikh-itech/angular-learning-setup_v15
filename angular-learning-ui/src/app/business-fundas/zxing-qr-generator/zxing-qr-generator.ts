import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../beans/product';
import { CommonService } from '../../common/services/common.service';

@Component({
  selector: 'zxing-qr-generator',
  templateUrl: './zxing-qr-generator.html',
  styleUrls: ['./zxing-qr-generator.css']
})
export class ZXingQrGenerator {

  errMsg!: string;
  product: Product;

  productId: any;
  productName: any;

  allQrInfo: any;

  constructor(private http: CommonService) {
    this.product = new Product();
  }

  searchAllQRCode(): void {

    this.http.getApiWithoutData(environment.qrDownloadAll).subscribe(
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

  searchQRCode(): void {

    let payload = {
      id: this.productId,
      name: this.productName
    };

    if (!this.productId && !this.productName)
      return alert('Id Or Name required');

    const requestOptions = { responseType: 'blob' as 'json', observe: 'response' };

    this.http.postApi(environment.qrCodeDownload, payload, requestOptions).subscribe(
      resp => {

        const contentDispositionHeader = resp.headers.get('Content-Disposition');
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDispositionHeader);
        const filename = matches != null && matches[1] ? matches[1].replace(/['"]/g, '') : 'qrcode.png';

        const blob = new Blob([resp.body], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        const imgElement = document.getElementById('qrCodeImage') as HTMLImageElement;
        imgElement.src = imageUrl;
        imgElement.alt = filename;

      },
      err => {
        console.log(err);
      }
    );
  }

  generateQRCode(): void {

    if (!this.product.name)
      return alert('Provide Name');

    if (!this.product.price || !(this.product.price>=0))
      return alert('Price should be 0 or more');

    this.http.postApi(environment.qrCodeGenerate, this.product).subscribe(
      resp => {
        console.log(resp)
      },
      err => {
        console.log(err);
      }
    );
  }
}
