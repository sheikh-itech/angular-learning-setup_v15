import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage-service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private localStorage: LocalStorageService) { }

  public isLoggedIn(): boolean {

    return (this.localStorage.getUsername()!='' && this.localStorage.getUsername()!=undefined 
            && this.localStorage.getUsername()!=null);
  }
}
