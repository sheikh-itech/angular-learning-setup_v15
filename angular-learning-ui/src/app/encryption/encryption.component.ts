import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonService } from '../common/services/common.service';
import { CryptoService } from '../crypto-services/crypto-service';
import { CustomCryptoService } from '../crypto-services/custom-crypto-service';

@Component({
  selector: 'encryption-app',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent {

  constructor(private enc: CryptoService, private http: CommonService,
    private customEnc: CustomCryptoService) {

  }

  password: any;
  encKey: any;

  user = {
    firstName: '',
    lastName: ''
  };
  user1 = {
    firstName: '',
    lastName: ''
  };
  encUser = {
    id: null,
    firstName: '',
    lastName: '',
    landmark: 'Bhopal',
    password: null,
    encKey: null
  };

  encUser1 = {
    id: null,
    firstName: '',
    lastName: '',
    landmark: 'Bhopal',
    password: null,
    encKey: null
  };

  httpUser = {
    id: 0,
    firstName: '',
    lastName: '',
    landmark: ''
  };
  httpUser1 = {
    id: 0,
    firstName: '',
    lastName: '',
    landmark: ''
  };

  submitDetail(): void {

    this.encUser.firstName = this.user.firstName;
    this.encUser.lastName = this.user.lastName;
    
    let encObj: any = this.enc.encryptObject(this.encUser);

    this.encUser = {
      id: null,
      firstName: encObj.firstName,
      lastName: encObj.lastName,
      landmark: encObj.landmark,
      password: null,
      encKey: null
    };

    this.http.postApi(environment.encCrypto, this.encUser).subscribe(
      resp => {
        this.httpUser = resp.data;
        console.log(resp)
      },
      err => {
        console.log(err)
      }
    );
  }

  submitAdvDetail(): void {

    if (!this.password || this.password.length != 18) {
      alert("Password should have 18 length");
      return;
    }      

    if (!this.encKey || this.encKey.length != 32) {
      alert("Enc Key should have 32 length");
      return;
    }      

    this.encUser1.firstName = this.user1.firstName;
    this.encUser1.lastName = this.user1.lastName;

    this.customEnc.init(this.password, this.encKey);
    let encObj: any = this.customEnc.encryptObject(this.encUser1);

    this.encUser1 = {
      id: encObj.resp.id,
      firstName: encObj.resp.firstName,
      lastName: encObj.resp.lastName,
      landmark: encObj.resp.landmark,
      password: this.password,
      encKey: encObj.encKey.toString()
    };

    this.http.postApi(environment.encAdvCrypto, this.encUser1).subscribe(
      resp => {
        this.httpUser1 = resp.data;
        console.log(resp)
      },
      err => {
        console.log(err)
      }
    );
  }
}
