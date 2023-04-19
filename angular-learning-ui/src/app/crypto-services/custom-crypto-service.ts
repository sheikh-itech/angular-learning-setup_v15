import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class CustomCryptoService {

  private key: any;
  private password: any; 
  private enckey: any; //IV
  private encryptor: any; //CryptoJS

  constructor() {
    this.encryptor = CryptoJS;
  }

  public init(password: string, encKey: string): void {
    this.password = password;
    this.enckey = this.encryptor.enc.Hex.parse(encKey);
    this.key = this.encryptor.PBKDF2(this.password, "salt", { keySize: 256 / 32, iterations: 1000, hasher: this.encryptor.algo.SHA512 });
  }

  public encryptObject(object: any): Object {

    if (!this.key || !this.enckey || !this.password)
      return { error: "initialize using init method" };

    Object.keys(object).forEach(key => {
      object[key] = this.customEncrypt(object[key], this.enckey, this.key);
    });

    return {
      resp: object,
      encKey: this.enckey
    };
  }

  public decryptObject(object: any, password: any, encKey: any): Object {

    if (!password || password == null || password.length != 18)
      return { error: "Password length should be 18" };

    if (!encKey || encKey == null || encKey.length != 32)
      return { error: "Enc Key length should be 32" };

    Object.keys(object).forEach(key => {
      object[key] = this.customDecrypt(object[key], encKey, password);
    });
    return object;
  }

  private customEncrypt(plainText: any, encKey: string, passKey: any): string {

    return this.encryptor.AES.encrypt(plainText, passKey, { iv: encKey }).toString();
  }

  private customDecrypt(encText: any, encKey: string, password: any): string {

    return this.encryptor.AES.decrypt(encText, password, { iv: encKey })
      .toString(this.encryptor.enc.Utf8);
  }
}
