import { Component } from '@angular/core';
import { AdvanceCryptoService } from '../crypto-services/adv-crypto-service';
import { CryptoService } from '../crypto-services/crypto-service';

@Component({
  selector: 'encryption-app',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent {

  constructor(private enc: CryptoService, private advEnc: AdvanceCryptoService) {

  }

  user = {
    username: '',
    password: ''
  };

  encUser = {
    field: '',
    username: '',
    password: ''
  };

  submitDetail(): void {

    this.encUser = {
      field: '',
      username: this.user.username,
      password: this.user.password
    };

    let encObj: any = this.enc.encryptObject(this.encUser);

    this.encUser = {
      field: encObj.encKey,
      username: encObj.object.username,
      password: encObj.object.password
    };
  }
}
