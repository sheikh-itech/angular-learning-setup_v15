import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/common/local-storage-service';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {

    constructor(private router: Router, private localStorage: LocalStorageService) {}

    user: any = {
        username: '',
        password: '',
        remember: true
    };

    private userDetail: User = new User('', '', true);

    public login(): void {

        if(this.user.username!=null && this.user.username!='')
            this.userDetail.setUsername(this.user.username)

        if(this.user.password!=null && this.user.password!='')
            this.userDetail.setPassword(this.user.password)

        this.userDetail.rememberMe(this.user.remember);

        if(this.userDetail.isValidUser()) 
            this.localStorage.setUserDetail(this.userDetail);

        this.user = {
            username: '',
            password: '',
            remember: true
        };
        this.router.navigate(['/']);
    }

    cancel(): void {

        this.router.navigate(['/login']);
    }
}

export class User {

    private username: String;
    private password: String;
    private remember: boolean;

    constructor(username: String, password: String, remember: boolean) {
        this.username = username;
        this.password = password;
        this.remember = remember;
    }

    public getUsername(): String {

        return this.username;
    }
    public setUsername(username: String): void {

        this.username = username;
    }

    public getPassword(): String {

        return this.password;
    }
    public setPassword(password: String): void {

        this.password = password;
    }

    public isRemembered(): boolean {

        return this.remember;
    }
    public rememberMe(remember: boolean): void {
        
        this.remember = remember;
    }

    public isValidUser(): boolean {

        if(this.username=='' || this.username==undefined)
            return false;

        if(this.password=='' || this.password==undefined)
            return false;

        if(this.remember==undefined)
            return false;

        return true;
    }
}