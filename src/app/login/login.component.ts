import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { Broadcaster } from '../providers/eventEmitter';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserHttpService]
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  public isLoading: any;
  public is_Login: any = true;

  isShowEmailErrorMessage = false;
  isShowPasswordErrorMessage = false;

  public cookieValue: any;
  public date: any;

  constructor(public http: UserHttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    public broadcast: Broadcaster,
    private socialAuthService: AuthService,
    private cookieService: CookieService) {
    window.scrollTo(0, 0);
    if (localStorage.getItem('is_Login')) {
      this.is_Login = JSON.parse(localStorage.getItem('is_Login')).isLogin;
      console.log("this.is_Login :", this.is_Login);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'rememberMe': [false]
    });

    const date = new Date();
    this.date = date.setDate(date.getDate() + 30);

    const emailValue = this.cookieService.get('email');
    const passwordValue = this.cookieService.get('password');
    if (emailValue) {
      this.loginForm.controls['email'].setValue(emailValue);
      this.loginForm.controls['rememberMe'].setValue(true);
    }
    if (passwordValue) {
      this.loginForm.controls['password'].setValue(passwordValue);
      this.loginForm.controls['rememberMe'].setValue(true);
    }
  }

  emailErrorMessage() {
    this.isShowEmailErrorMessage = !this.isShowEmailErrorMessage;
  }

  passwordErrorMessage() {
    this.isShowPasswordErrorMessage = !this.isShowPasswordErrorMessage;
  }

  /** user Login */
  login(value) {
    this.isLoading = true;
    console.log("this.is_Login in login func :", this.is_Login);
    if (this.is_Login === false && value.rememberMe === true) {
      this.broadcast.broadcast('cookiedata', value.rememberMe);
      this.cookieService.set('email', this.loginForm.value.email, new Date(this.date));
      this.cookieService.set('password', this.loginForm.value.password, new Date(this.date));

      const userdataOne = {
        email: value.email,
        password: value.password,
        device_type: '',
        device_token: ''
      };
      console.log('userdataOne :', userdataOne);
      this.http.login(userdataOne).then((data: any) => {
        console.log('data :', data);
        if (data.ack === 0) {
          this.toastr.error(data.msg, 'Error', {
            timeOut: 3000
          });
          this.isLoading = false;
        } else if (data.ack === 1) {
          this.isLoading = false;
          localStorage.setItem('UserData', JSON.stringify(data.userdetail));
          this.broadcast.broadcast('userdata', data.userdetail);

          this.router.navigate(['/startbooking']);
          localStorage.removeItem("is_Login");
          window.scrollTo(0, 0);
        }
      }).catch((error) => {
        this.isLoading = false;
        console.log('error :', error);
        this.toastr.error('Please try again later..', 'Error', {
          timeOut: 3000
        });
      });
    }

    if (this.is_Login === false && value.rememberMe === false) {
      this.cookieService.delete('email');
      this.cookieService.delete('password');

      const userdataOne = {
        email: value.email,
        password: value.password,
        device_type: '',
        device_token: ''
      };
      console.log('userdataOne :', userdataOne);
      this.http.login(userdataOne).then((data: any) => {
        console.log('data :', data);
        if (data.ack === 0) {
          this.toastr.error(data.msg, 'Error', {
            timeOut: 3000
          });
          this.isLoading = false;
        } else if (data.ack === 1) {
          this.isLoading = false;
          localStorage.setItem('UserData', JSON.stringify(data.userdetail));
          this.broadcast.broadcast('userdata', data.userdetail);

          this.router.navigate(['/startbooking']);
          localStorage.removeItem("is_Login");
          window.scrollTo(0, 0);
        }
      }).catch((error) => {
        this.isLoading = false;
        console.log('error :', error);
        this.toastr.error('Please try again later..', 'Error', {
          timeOut: 3000
        });
      });
    }
    if (this.is_Login === true && value.rememberMe === true) {
      this.broadcast.broadcast('cookiedata', value.rememberMe);
      this.cookieService.set('email', this.loginForm.value.email, new Date(this.date));
      this.cookieService.set('password', this.loginForm.value.password, new Date(this.date));

      const userdata = {
        email: value.email,
        password: value.password,
        device_type: '',
        device_token: ''
      };
      console.log('userdata :', userdata);
      this.http.login(userdata).then((data: any) => {
        console.log('data :', data);
        if (data.ack === 0) {
          this.toastr.error(data.msg, 'Error', {
            timeOut: 3000
          });
          this.isLoading = false;
        } else if (data.ack === 1) {
          this.isLoading = false;
          localStorage.setItem('UserData', JSON.stringify(data.userdetail));
          this.broadcast.broadcast('userdata', data.userdetail);

          this.router.navigate(['/home']);
          window.scrollTo(0, 0);
        }
      }).catch((error) => {
        this.isLoading = false;
        console.log('error :', error);
        this.toastr.error('Please try again later..', 'Error', {
          timeOut: 3000
        });
      });
    }
    if (this.is_Login === true && value.rememberMe === false) {
      this.cookieService.delete('email');
      this.cookieService.delete('password');

      const userdata = {
        email: value.email,
        password: value.password,
        device_type: '',
        device_token: ''
      };
      console.log('userdata :', userdata);
      this.http.login(userdata).then((data: any) => {
        console.log('data :', data);
        if (data.ack === 0) {
          this.toastr.error(data.msg, 'Error', {
            timeOut: 3000
          });
          this.isLoading = false;
        } else if (data.ack === 1) {
          this.isLoading = false;
          localStorage.setItem('UserData', JSON.stringify(data.userdetail));
          this.broadcast.broadcast('userdata', data.userdetail);

          this.router.navigate(['/home']);
          window.scrollTo(0, 0);
        }
      }).catch((error) => {
        this.isLoading = false;
        console.log('error :', error);
        this.toastr.error('Please try again later..', 'Error', {
          timeOut: 3000
        });
      });
    }
  }

  // facebook login
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ', userData);
      }
    );
  }
}
