import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Broadcaster } from '../providers/eventEmitter';
import { PasswordValidation } from './password-validation';
import { CookieService } from 'ngx-cookie-service';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserHttpService]
})

export class ProfileComponent implements OnInit {
  editProfile: FormGroup;
  changePassword: FormGroup;
  url: any;
  isShowFirstNameErrorMessage = false;
  isShowLastNameErrorMessage = false;
  isShowMobileErrorMessage = false;
  isShowDOBErrorMessage = false;
  public maxDate: any;
  public userDOB: any;
  public day: any;
  public month: any;
  public year: any;
  public first_name: any;
  public last_name: any;
  public mobile: any;
  public date_of_birth: any;
  public email: any;
  public imageData: any;
  public userId: any;
  public isLoading = false;
  public userImage: any = '';
  isDefaultImageShow = true;
  isImageShow = false;
  isShowOldPasswordErrorMessage = false;
  isShowPasswordErrorMessage = false;
  isShowConfirmPasswordErrorMessage = false;
  public ConfirmPassword: any;
  public date: any;
  public cookieKey: any;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public getuserdetail :any;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: any;
  data: any;
  IsShowImagePart = true;
  constructor(public http: UserHttpService,
  private fb: FormBuilder,
  private cd: ChangeDetectorRef,
  public router: Router,
  private toastr: ToastrService,
  public broadcast: Broadcaster,
  private cookieService: CookieService) {
    const date = new Date();
    this.maxDate = new Date(date.setDate(date.getDate() - 365 * 10));
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.rounded = true;
    this.data = {};
  }
  ngOnInit() {
    this.editProfile = this.fb.group({
      'first_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'last_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'mobile': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      'date_of_birth': '',
      'email': { value: this.email, disabled: true }
    });

    this.changePassword = this.fb.group({
      'old_password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmed_password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      });

    const date = new Date();
    this.date = date.setDate(date.getDate() + 30);
    this.userId = JSON.parse(localStorage.getItem('UserData')).id;
    this.http.getUserDetails(this.userId).then((success: any) => {
      this.getuserdetail = success.userdetails[0];
      console.log('this.getuserdetail',this.getuserdetail);
      this.first_name = success.userdetails[0].first_name;
      this.editProfile.controls['first_name'].setValue(this.first_name);

      this.last_name = success.userdetails[0].last_name;
      this.editProfile.controls['last_name'].setValue(this.last_name);

      this.email = success.userdetails[0].email;
      this.editProfile.controls['email'].setValue(this.email);

      this.mobile = success.userdetails[0].phone;
      this.editProfile.controls['mobile'].setValue(this.mobile);

      this.date_of_birth = success.userdetails[0].date_of_birth;
      this.editProfile.controls['date_of_birth'].setValue(new Date(this.date_of_birth));

      if (success.userdetails[0].profile_image) {
        this.isDefaultImageShow = false;
        this.isImageShow = true;
        this.userImage = success.userdetails[0].profile_image;
      } else if (success.userdetails[0].profile_image === '') {
        this.isDefaultImageShow = true;
        this.isImageShow = false;
      }
    }).catch((error: any) => {
      // success toaster display
      this.toastr.error('Please try again later..', 'Error', {
        timeOut: 5000
      });
    });

    this.broadcast.on<any>('cookiedata')
      .subscribe(data => {
        localStorage.setItem('cookieKey', JSON.stringify({ 'value': data }));
      });
  }

  oldPasswordErrorMessage() {
    this.isShowOldPasswordErrorMessage = !this.isShowOldPasswordErrorMessage;
  }

  passwordErrorMessage() {
    this.isShowPasswordErrorMessage = !this.isShowPasswordErrorMessage;
  }

  confirmPasswordErrorMessage() {
    this.isShowConfirmPasswordErrorMessage = !this.isShowConfirmPasswordErrorMessage;
  }
  fileChangeListener($event) {
    $("#changeImagePart").show();
    this.IsShowImagePart = false;
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);


    };

    myReader.readAsDataURL(file);
  }
  // clear localstorage data
  logout() {
    localStorage.clear();

    this.broadcast.broadcast('userdata', {
      first_name: '',
      last_name: ''
    });

    const data = {
      id: this.userId
    };
    this.http.userLogout(data).then((success: any) => {
      if (success.ack === 0) {
        // error message toaster display
        this.toastr.error('Logout failed', 'Error', {
          timeOut: 5000
        });
      } else if (success.ack === 1) {
        // this.userImage = success.image;
        // success message toaster display
        // this.toastr.success(success.msg, 'Success', {
        //   timeOut: 5000
        // });
      }
    }).catch((error: any) => {
      // success toaster display
      this.toastr.error('Please try again later..', 'Error', {
        timeOut: 5000
      });
    });
    this.router.navigate(['/login']);
  }

  // image select
  onChange(event: any) {
    const fileList: FileList = event.target.files;
    console.log('fileList :', fileList);
    if (fileList.length > 0) {

      // image preview
      const reader = new FileReader();
      reader.onload = (eventOne: any) => {
        this.isDefaultImageShow = false;
        this.isImageShow = true;
        this.userImage = eventOne.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      const file: File = fileList[0];
      console.log('file :', file);
      this.imageData = new FormData();
      this.imageData.append('image', file);
      this.imageData.append('id', this.userId);
      // upload
      // this.http.imageUpload(this.imageData).then((success: any) => {
      //   console.log('success :', success);
      //   if (success.ack === 0) {
      //     // error message toaster display
      //     this.toastr.error('Image upload failed', 'Error', {
      //       timeOut: 5000
      //     });
      //   } else if (success.ack === 1) {
      //     this.userImage = success.userdetails[0].profile_image;
      //     // success message toaster display
      //     this.toastr.success('Image upload successful', 'Success', {
      //       timeOut: 5000
      //     });
      //     // store data in localstore
      //     localStorage.setItem('UserData', JSON.stringify(success.userdetails[0]));
      //     this.broadcast.broadcast('userdata', success.userdetails[0]);
      //   }
      // }).catch((error: any) => {
      //   console.log('error :', error);
      //   // success toaster display
      //   this.toastr.error('Please try again later..', 'Error', {
      //     timeOut: 5000
      //   });
      // });
    }
  }

  // first name error message show
  firstNameErrorMessage() {
    this.isShowFirstNameErrorMessage = !this.isShowFirstNameErrorMessage;
  }

  // last name error message show
  lastNameErrorMessage() {
    this.isShowLastNameErrorMessage = !this.isShowLastNameErrorMessage;
  }

  // mobile error message show
  mobileErrorMessage() {
    this.isShowMobileErrorMessage = !this.isShowMobileErrorMessage;
  }

  // dob select error message show
  dobSelectErrorMessage() {
    this.isShowDOBErrorMessage = !this.isShowDOBErrorMessage;
  }
  saveImage() {

    const contentType = this.data.image.split(';')[0].split(":")[1];
    const data = { "image": this.data.image, id: this.userId };
    // upload
    this.http.imageUpload(data).then((success: any) => {
      console.log('success :', success);
      if (success.ack === 0) {
        // error message toaster display
        this.toastr.error('Image upload failed', 'Error', {
          timeOut: 5000
        });
      } else if (success.ack === 1) {
        this.userImage = success.userdetails[0].profile_image;
        // success message toaster display
        this.toastr.success('Image upload successful', 'Success', {
          timeOut: 5000
        });
        // store data in localstore
        localStorage.setItem('UserData', JSON.stringify(success.userdetails[0]));
        this.broadcast.broadcast('userdata', success.userdetails[0]);
      }
    }).catch((error: any) => {
      console.log('error :', error);
      // success toaster display
      this.toastr.error('Please try again later..', 'Error', {
        timeOut: 5000
      });
    });
  }
  cancelImage() {
    $("#changeImagePart").hide();
    this.IsShowImagePart = true;
  }

  submit(value) {
    console.log(value);
    this.isLoading = true;

    if (value.date_of_birth) {
      this.day = value.date_of_birth.getDate();
      this.month = value.date_of_birth.getMonth();
      this.year = value.date_of_birth.getFullYear();
      this.userDOB = this.year + '-' + (this.month + 1) + '-' + this.day;
      console.log(this.userDOB);
    } else if (!value.date_of_birth) {
      this.userDOB = '';
    }

    this.first_name = value.first_name ? value.first_name : '';
    this.last_name = value.last_name ? value.last_name : '';
    this.mobile = value.mobile ? value.mobile : '';
    this.date_of_birth = this.userDOB;

    const data = {
      first_name: this.first_name,
      last_name: this.last_name,
      mobile: this.mobile,
      date_of_birth: this.date_of_birth,
      id: this.userId,
      country_id: '',
      gender: ''
    };

    this.http.editProfile(data).then((success: any) => {
      console.log('success :', success);
      if (success.ack === 0) {
        // error message toaster display
        this.toastr.error(success.msg, 'Error', {
          timeOut: 5000
        });
      } else if (success.ack === 1) {
        // success message toaster display
        this.toastr.success(success.msg, 'Success', {
          timeOut: 5000
        });
        // store data in localstore
        localStorage.setItem('UserData', JSON.stringify(success.result));
        this.broadcast.broadcast('userdata', success.result);
      }
      this.isLoading = false;
    }).catch((error: any) => {
      console.log('error :', error);
      this.isLoading = false;
      // success toaster display
      this.toastr.error('Please try again later..', 'Error', {
        timeOut: 5000
      });
    });

  }

  // change password
  PasswordChange(value) {
    this.isLoading = true;
    this.ConfirmPassword = value.confirmed_password;
    const data = {
      user_id: this.userId,
      old_password: value.old_password,
      new_password: value.password,
      confirmed_password: value.confirmed_password
    };

    this.http.ChangePassword(data).then((success: any) => {
      console.log('success :', success);
      if (success.ack === '0') {
        this.isLoading = false;
        this.toastr.error(success.msg, 'Error', {
          timeOut: 3000
        });
      } else if (success.ack === '1') {
        this.isLoading = false;
        this.toastr.success(success.msg, 'Success', {
          timeOut: 3000
        });
        if (JSON.parse(localStorage.getItem('cookieKey')).value === true) {
          this.cookieService.set('password', this.ConfirmPassword, new Date(this.date));
          localStorage.removeItem('cookieKey');
        }
      }
    }).catch((error: any) => {
      this.isLoading = false;
      console.log('error :', error);
    });
  }

}
