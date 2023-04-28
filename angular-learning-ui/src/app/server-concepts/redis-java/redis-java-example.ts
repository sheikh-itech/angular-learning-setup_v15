import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../common/services/common.service';
import { Utility } from '../../common/services/utility';

@Component({
  selector: 'app-redis-java',
  templateUrl: './redis-java-example.html',
  styleUrls: ['./redis-java-example.css']
})
export class RedisJavaExample {

  user: User;
  users: User[];
  respUser: User;
  showFirstResp = false;
  showSecondResp = false;
  userId: any;
  deleteId: any;
  deleteResp: any;

  constructor(private util: Utility, private http: CommonService) {
    this.user = new User();
  }

  tabSwitch(event: any): void {
    console.log('Active Tab=> index- ' + event.index + ', label- ' + event.tab.textLabel);
  }

  public getAllUsers(): void {

    this.http.getApiWithoutData(environment.redisGetUsers).subscribe(
      res => {
        this.users = res.data;
        this.showSecondResp = true;
      },
      err => {
        console.log(err);
        this.showSecondResp = false;
      }
    );
  }

  public getUser(): void {
    if (!this.userId) {
      alert('User id required');
      return;
    }

    this.http.getApiWithoutData(environment.redisGetUser + this.userId).subscribe(
      res => {
        this.users = res.data;
        this.showSecondResp = true;
      },
      err => {
        console.log(err);
        this.showSecondResp = false;
      }
    );
  }

  public deleteAllUsers(): void {

    this.http.deleteApi(environment.redisDeleteAllUser, null).subscribe(
      res => {
        this.deleteResp = res.message;
      },
      err => {
        console.log(err);
        this.deleteResp = err;
      }
    );
  }

  public deleteUser(): void {
    if (!this.deleteId) {
      alert('User id required');
      return;
    }

    this.http.deleteApi(environment.redisDeleteUser + this.deleteId, this.deleteId).subscribe(
      res => {
        this.deleteResp = res.message;
      },
      err => {
        this.deleteResp = err;
        console.log(err);
      }
    );
  }

  public saveUserDetail(): void {

    if (this.util.isEmptyObject(this.user)) {
      alert('All fields required');
      return;
    }

    this.http.postApi(environment.redisUserAdd, this.user).subscribe(
      res => {
        this.respUser = res.data;
        this.showFirstResp = true;
        this.user = new User();
      },
      err => {
        console.log(err);
        this.showFirstResp = false;
      }
    );
  }

  public agreementDate(event: any): void {

    this.user.dob = this.util.yyyyMMdd(event.value);
  }
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  zipcode: number;
  landmark: string;
}
