import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-login',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss'],
  providers: [UserHttpService]
})

export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  otpForm: FormGroup;
  forgotPasswordInputForm: FormGroup;

  public emailValue: any;

  isFPFormShow = true;
  isOtpForm = false;
  isFPInputFormShow = false;

  public isLoading = false;
  public isLoadingResendOtp = false;
  isShowEmailErrorMessage = false;

  isShowPasswordErrorMessage = false;
  isShowConfirmPasswordErrorMessage = false;

  public maxOtpSendNumber = 3;
  public initialOtpNumber = 0;
  isResendOtpShow = true;

  @ViewChild('otp1') otp1Element: ElementRef;
  @ViewChild('otp2') otp2Element: ElementRef;
  @ViewChild('otp3') otp3Element: ElementRef;
  @ViewChild('otp4') otp4Element: ElementRef;
  @ViewChild('otp5') otp5Element: ElementRef;
  @ViewChild('otp6') otp6Element: ElementRef;


  constructor(public http: UserHttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router) {
    window.scrollTo(0, 0);

  }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    });

    this.otpForm = this.fb.group({
      'otp1': ['', Validators.compose([Validators.required])],
      'otp2': ['', Validators.compose([Validators.required])],
      'otp3': ['', Validators.compose([Validators.required])],
      'otp4': ['', Validators.compose([Validators.required])],
      'otp5': ['', Validators.compose([Validators.required])],
      'otp6': ['', Validators.compose([Validators.required])]
    });

    this.forgotPasswordInputForm = this.fb.group({
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmed_password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );

    this.otpForm.get('otp1').valueChanges
      .subscribe((data) => {
        if (data) {
          this.otp2Element.nativeElement.focus();
        }
      });

    this.otpForm.get('otp2').valueChanges
      .subscribe((data) => {
        if (data) {
          this.otp3Element.nativeElement.focus();
        }
      });

    this.otpForm.get('otp3').valueChanges
      .subscribe((data) => {
        if (data) {
          this.otp4Element.nativeElement.focus();
        }
      });

    this.otpForm.get('otp4').valueChanges
      .subscribe((data) => {
        if (data) {
          this.otp5Element.nativeElement.focus();
        }
      });

    this.otpForm.get('otp5').valueChanges
      .subscribe((data) => {
        if (data) {
          this.otp6Element.nativeElement.focus();
        }
      });
  }

  // email error message show
  emailErrorMessage() {
    this.isShowEmailErrorMessage = !this.isShowEmailErrorMessage;
  }

  // password error message show
  passwordErrorMessage() {
    this.isShowPasswordErrorMessage = !this.isShowPasswordErrorMessage;
  }

  // confirm password error message show
  confirmPasswordErrorMessage() {
    this.isShowConfirmPasswordErrorMessage = !this.isShowConfirmPasswordErrorMessage;
  }

  // send otp
  sendOtp(value) {
    this.isLoading = true;
    this.emailValue = value.email;
    this.http.forgotPasswordSendOtp(value).then((success: any) => {
      console.log('fp send otp res :', success);
      if (success.ack === '0') {
        this.isOtpForm = false;
        this.isFPFormShow = true;
        this.isFPInputFormShow = false;
        // error message toaster display
        this.toastr.error(success.msg, 'Error', {
          timeOut: 5000
        });
      } else if (success.ack === '1') {
        this.isOtpForm = true;
        this.isFPFormShow = false;
        this.isFPInputFormShow = false;
        // success toaster display
        this.toastr.success(success.msg, 'Success', {
          timeOut: 5000
        });
      }
      this.isLoading = false;
    }).catch((error: any) => {
      this.isLoading = false;
      console.log('fp send otp res error :', error);
      // success toaster display
      this.toastr.error('Please try again later..', 'Error', {
        timeOut: 5000
      });
      this.isOtpForm = false;
      this.isFPFormShow = true;
      this.isFPInputFormShow = false;
    });
  }

  // submit otp
  submitOtp(value) {
    this.isLoading = true;
    const otp = value.otp1 + value.otp2 + value.otp3 + value.otp4 + value.otp5 + value.otp6;
    const OTP = parseInt(otp, 10);
    const data = {
      email: this.emailValue,
      otp: OTP
    };
    this.http.SubmitOtp(data).then((success: any) => {
      console.log('fp otp submit res :', success);
      if (success.ack === '0') {
        this.isOtpForm = true;
        this.isFPFormShow = false;
        this.isFPInputFormShow = false;
        // error message toaster display
        this.toastr.error(success.msg, 'Error', {
          timeOut: 5000
        });
      } else if (success.ack === '1') {
        this.isOtpForm = false;
        this.isFPFormShow = false;
        this.isFPInputFormShow = true;
        // success toaster display
        this.toastr.success(success.msg, 'Success', {
          timeOut: 5000
        });
      }
      this.isLoading = false;
    }).catch((error: any) => {
      this.isLoading = false;

      this.isOtpForm = true;
      this.isFPFormShow = false;
      this.isFPInputFormShow = false;
      console.log('fp otp submit res error :', error);
      // success toaster display
      this.toastr.error('Please try again later..', 'Error', {
        timeOut: 5000
      });
    });
  }

  // resend otp
  resendOtp() {
    this.isLoadingResendOtp = true;
    this.initialOtpNumber++;
    console.log(this.initialOtpNumber);
    if (this.initialOtpNumber !== this.maxOtpSendNumber) {
      console.log('otp send');
      this.isResendOtpShow = true;
      // this.isLoadingResendOtp = true;
      const data = {
        email: this.emailValue
      };
      this.http.resendOTP(data).then((success: any) => {
        console.log('resend otp res :', success);
        if (success.ack === '0') {
          // error message toaster display
          this.toastr.error(success.msg, 'Error', {
            timeOut: 5000
          });
        } else if (success.ack === '1') {
          // success toaster display
          this.toastr.success(success.msg, 'Success', {
            timeOut: 5000
          });
        }
        this.isLoadingResendOtp = false;
      }).catch((error: any) => {
        this.isLoadingResendOtp = false;
        console.log('resend otp error :', error);
        // success toaster display
        this.toastr.error('Please try again later..', 'Error', {
          timeOut: 5000
        });
      });
      // this.isLoadingResendOtp = false;
    } else if (this.initialOtpNumber === this.maxOtpSendNumber) {
      this.isLoadingResendOtp = true;
      this.isResendOtpShow = true;
      // this.isLoadingResendOtp = true;
      const data = {
        email: this.emailValue
      };
      this.http.resendOTP(data).then((success: any) => {
        console.log('resend otp res :', success);
        if (success.ack === '0') {
          // error message toaster display
          this.toastr.error(success.msg, 'Error', {
            timeOut: 5000
          });
        } else if (success.ack === '1') {
          // success toaster display
          this.toastr.success(success.msg, 'Success', {
            timeOut: 5000
          });
          this.isResendOtpShow = false;
        }
        this.isLoadingResendOtp = false;
      }).catch((error: any) => {
        this.isLoadingResendOtp = false;
        console.log('resend otp error :', error);
        // success toaster display
        this.toastr.error('Please try again later..', 'Error', {
          timeOut: 5000
        });
      });
      // this.isLoadingResendOtp = false;
    }
  }
  // password reset
  passwordReset(value) {
    const data = {
      email: this.emailValue,
      new_password: value.password,
      confirmed_password: value.confirmed_password
    };
    this.http.FpChangeValue(data).then((success: any) => {
      console.log('fp submit res :', success);
      if (success.ack === '0') {
        // error message toaster display
        this.toastr.error(success.msg, 'Error', {
          timeOut: 5000
        });
      } else if (success.ack === '1') {
        // success toaster display
        this.toastr.success(success.msg, 'Success', {
          timeOut: 5000
        });
        // redirected to homepage
        this.router.navigate(['/home']);
      }
      this.isLoading = false;
    }).catch((error: any) => {
      this.isLoading = false;
      console.log('fp submit res error :', error);
      // success toaster display
      this.toastr.error('Please try again later..', 'Error', {
        timeOut: 5000
      });
    });
  }
}
