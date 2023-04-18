import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class AdvanceCryptoService {

  private key: any;
  private password: any; 
  private enckey: any; //IV
  private encryptor: any; //CryptoJS

  constructor() {
    this.encryptor = CryptoJS;
    this.password = "encryption-service";
    this.enckey = this.encryptor.enc.Hex.parse(new Array(32).fill(0).toString().replaceAll(",", ""));
    this.key = this.encryptor.PBKDF2(this.password, "salt", { keySize: 256 / 32, iterations: 1000, hasher: this.encryptor.algo.SHA512 });
  }

  public encrypt(plainText: any): string {
    let temp = this.encryptor.AES.encrypt(plainText, this.key, { iv: this.enckey });
    return temp.toString();
  }

  public decrypt(encryptedText: any): string {

    return this.encryptor.AES.decrypt(encryptedText, this.key, { iv: this.enckey })
      .toString(this.encryptor.enc.Utf8);
  }

  public encryptObject(object: any, password: any): Object {

    if (!password || password ==null || password.length != 18)
      return { error: "Password length should be 18" };

    let passKey = this.encryptor.PBKDF2(password, "salt", { keySize: 256 / 32, iterations: 1000, hasher: this.encryptor.algo.SHA512 });
    let encryptkey = this.init();

    Object.keys(object).forEach(key => {
      object[key] = this.customEncrypt(object[key], encryptkey, passKey);
    });

    return {
      password: passKey,
      encKey: encryptkey.toString(),
      object: object
    };
  }

  public decryptObject(object: any, encKey: any, password: any): Object {

    if (!password || password == null || password.length != 18)
      return { error: "Password length should be 18" };

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

  private init(): string {

    return this.encryptor.enc.Hex.parse(Array.from(Array(32),
      () => Math.floor(Math.random() * 36).toString(36)).join(''));
  }
}
