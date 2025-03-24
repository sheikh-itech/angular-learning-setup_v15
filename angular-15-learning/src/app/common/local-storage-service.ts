import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    public setUserDetail(userDetail: any, rememberMe: boolean = false): void {
        
        if (rememberMe)
            localStorage.setItem('~msf-ud', JSON.stringify(userDetail));
        else {
            this.logOut();
            sessionStorage.setItem('~msf-ud', JSON.stringify(userDetail));
        }
    }

    public logOut() {

        localStorage.removeItem('~msf-ud');
    }

    public getUsername() {

        let detail = this.getUserDetail();
        return detail ? detail.username : null;
    }

    public getUserId() {

        let detail = this.getUserDetail();
        return detail ? detail.userId : null;
    }

    public getUserRoleId() {

        let detail = this.getUserDetail();
        return detail ? detail.userId : null;
    }

    public getUserRoles() {

        let detail = this.getUserDetail();
        return detail ? detail.roles : null;
    }

    public getUserMail() {

        let detail = this.getUserDetail();
        return detail ? detail.email : null;
    }

    public getUserToken() {

        let detail = this.getUserDetail();
        return detail ? detail.token : null;
    }

    public getUserModules() {

        let detail = this.getUserDetail();
        return detail ? detail.grantedModules : null;
    }

    public getModuleMappings() {

        let detail = this.getUserDetail();
        return detail ? detail.moduleMapping : null;
    }

    private getUserDetail() {

        let token = localStorage.getItem("~msf-ud");

        if (token != null)
            return JSON.parse(token);
        else {
            token = sessionStorage.getItem("~msf-ud");
            if (token != null)
                return JSON.parse(token);
        }

        return null;
    }
}
