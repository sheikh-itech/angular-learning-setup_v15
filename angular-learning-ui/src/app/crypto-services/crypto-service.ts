import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class CryptoService {

  private key: any;
  private encKey: any;
  private encryptor: any;
  private constant: any;

  constructor() {
    this.encryptor = CryptoJS;

    //Enc Key should be 18 in length
    this.encKey = "encryption-service";

    //32 length WordArray/IV for Encryption Strategy
    this.constant = this.encryptor.enc.Hex.parse("00000000000000000000000000000000");
    //this.constant = this.encryptor.enc.Hex.parse(new Array(32).fill(0).toString().replaceAll(",", ""));

    /* keySize: size of output key
     * hasher: type of algoritham
     * salt: A WordArray
     */
    this.key = this.encryptor.PBKDF2(this.encKey, "salt", { keySize: 256 / 32, iterations: 1000, hasher: this.encryptor.algo.SHA512 });
  }

  public encrypt(text: any): void {

    return this.encryptor.AES.encrypt(text, this.key, { iv: this.constant }).toString();
  }

  public decrypt(encText: any): string {

    return this.encryptor.AES.decrypt(encText, this.key, { iv: this.constant })
      .toString(this.encryptor.enc.Utf8);
  }

  public encryptObject(object: any): Object {

    Object.keys(object).forEach(key => {
      object[key] = this.encrypt(object[key]);
    });

    return object;
  }

  public decryptObject(object: any): Object {

    Object.keys(object).forEach(key => {
      object[key] = this.decrypt(object[key]);
    });
    return object;
  }
}
