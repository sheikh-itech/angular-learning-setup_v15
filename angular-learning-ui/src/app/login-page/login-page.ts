import { Component } from '@angular/core';
import { UserDetail } from '../common/login';
import { CommonService } from '../common/services/common.service';
import { AuthService } from '../routing-navigation/auth-service';
import { NavigateService } from '../routing-navigation/navigate-service';
import { RedirectService } from '../routing-navigation/redirect-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage {

  constructor(private service: CommonService, private authService: AuthService,
    private nav: NavigateService, private redirect: RedirectService) {
    this.login = new UserDetail();
  }

  public errMsg!: string;
  public onKeyUp(e: any): void {
    if (e.target.value != "")
      this.errMsg = "";

  }
  private routeData = "Passed data using Route parameters";

  login: UserDetail;

  public logOut(): void {
    this.authService.logout();
    //Redirect Service for Navigation to other location
    this.redirect.goToHome();
    this.redirect.goToExample();
  }

  public signIn(): void {
    if (Object.keys(this.login).length==0 || !this.login.username || !this.login.password) {
      this.errMsg = "Username and Password Required";
    } else {
      this.authService.login(this.login);
      this.login = new UserDetail();
      //Router Service for Navigation
      this.nav.goToUrl('/interpolation', this.routeData);
      /*
      this.service.postApi(environment.authUrl, this.login).subscribe(
        res => {
          this.errMsg = "";
          if (res.message == 'success' && res.data && !res.error) {

            localStorage.setItem('~u-d-f-va', JSON.stringify(res.data));
          } else {
            this.errMsg = "Invalid Credentials !!";
          }
        },
        err => {
          this.errMsg = "Something went wrong !!";
        }
      );
      */
    }
  }

  ngOnInit(): void {
  }
}
