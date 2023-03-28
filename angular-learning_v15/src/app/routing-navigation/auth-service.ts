import { Injectable } from '@angular/core';
import { UserDetail } from '../common/login';
import { AdvanceCryptoService } from '../common/services/adv-crypto-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private crypto: AdvanceCryptoService) { }

  public isValid(): boolean {

    return this.validateAccess();
  }

  public login(user: UserDetail): void {

    let outcome = {
      username: user.username,
      password: user.password,
      value: ''
    };
    let _temp:any = this.crypto.encryptObject(outcome);
    outcome = _temp?.object;
    outcome.value = _temp?.encKey;
    this.grantAccess(outcome);
  }

  public logout(): void {
    this.revokeAccess();
  }

  private validateAccess(): boolean {

    let detail: any = localStorage.getItem('~u-d-f-va');
    if (!detail)
      return false;
    
    try {
      let outcome:any = JSON.parse(detail);
      let res: any = this.crypto.decryptObject(JSON.parse(detail), outcome.value);
      if (res.username == res.password)
        return true;
      else
        return false;
    } catch (err) { return false; }
  }
  private grantAccess(object: any) {
    localStorage.setItem('~u-d-f-va', JSON.stringify(object));
  }
  private revokeAccess() {
    localStorage.removeItem('~u-d-f-va');
  }
}
