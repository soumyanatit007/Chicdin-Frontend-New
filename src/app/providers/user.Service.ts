import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';

@Injectable()
export class UserHttpService {
    public headers: any;

    constructor(private http: HttpClient) {
        const headers = new HttpHeaders();
        this.headers = headers.set('Content-Type', 'application/json');
    }

    /**User login */
    login(value: any) {
        const _base = this;
        console.log('login value :', value);
        console.log('url :', baseUrl);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_login', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /**user registration */
    signUp(value: any) {
        const _base = this;
        console.log('signup value :', value);
        console.log('url :', baseUrl);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_customer_signup', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /**get countries list */
    getCountryList() {
        const _base = this;
        return new Promise(function (reject, resolve) {
            _base.http.get(baseUrl.baseURL + '/webservice/users/app_country_list', { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /**forget password */
    forgotPasswordSendOtp(value: any) {
        const _base = this;
        console.log('forgotPassword value :', value);
        console.log('url :', baseUrl);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_forgot_password', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /** forgot password submit otp */
    SubmitOtp(value: any) {
        const _base = this;
        console.log('submit otp value :', value);
        console.log('url :', baseUrl);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_otp_match', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /** forgot password change value */
    FpChangeValue(value: any) {
        const _base = this;
        console.log('fp value :', value);
        console.log('url :', baseUrl);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_reset_password', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /** resend otp */
    resendOTP(value: any) {
        const _base = this;
        console.log('resend otp value :', value);
        console.log('url :', baseUrl);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_forgot_password', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /** user email existance check */
    emailExistanceCheck(value: any) {
        const _base = this;
        console.log('user email exist value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/webservice/users/app_is_email_exist', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /**otp send after email varified in registration */
    otpSendAfterEmailVerified(value: any) {
        const _base = this;
        console.log('otp send value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_customer_signup_email_verification', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /**Otp match in registration */
    OtpMatch(value: any) {
        const _base = this;
        console.log('otp match value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_customer_signup_otp_match', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    /** edit profile */
    editProfile(value: any) {
        const _base = this;
        console.log('edit profile value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/webservice/users/app_edit_profile', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // get user details
    getUserDetails(value: any) {
        const _base = this;
        console.log('getting user details id :', value);
        return new Promise(function (reject, resolve) {
            _base.http.get(baseUrl.baseURL + '/webservice/users/app_profile_details/' + value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // image upload
    imageUpload(value: any) {
        const _base = this;
        console.log('image upload value :', value);
        return new Promise(function (reject, resolve) {
            // tslint:disable-next-line:max-line-length
            _base.http.post(baseUrl.baseURL + '/webservice/users/app_edit_profile_image_change', value)
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // user logout
    userLogout(value) {
        const _base = this;
        console.log('user logout value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/webservice/users/app_logout', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // change pasword
    ChangePassword(value) {
        const _base = this;
        console.log('user logout value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/users/app_password_change', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // fetching catagories
    fetchingCatagories() {
        const _base = this;
        return new Promise(function (reject, resolve) {
            _base.http.get(baseUrl.baseURL + '/webservice/services/app_fetch_categories', { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // service search
    serviceSearch(value) {
        const _base = this;
        console.log('service search value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/webservice/services/app_service_search', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // serach
    search(value) {
        const _base = this;
        console.log('search value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/webservice/services/app_service_search_selected', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // service filter
    serviceFilter(value) {
        const _base = this;
        console.log('service filter value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/webservice/services/app_service_filter', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // company details fetch
    companyDetailsFetch(value1, value2) {
        const _base = this;
        return new Promise(function (reject, resolve) {
            // tslint:disable-next-line:max-line-length
            _base.http.get(baseUrl.baseURL + '/webservice/services/app_company_details/' + value1 + "/" + value2, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // company image fetch
    compantImageFetch(value) {
        const _base = this;
        return new Promise(function (reject, resolve) {
            _base.http.get(baseUrl.baseURL + '/webservice/services/app_company_gallery_image_fetch/' + value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // all booking record fetch
    allBookingRecordFetch(value) {
        const _base = this;
        return new Promise(function (reject, resolve) {
            _base.http.get(baseUrl.baseURL + '/webservice/bookings/app_all_bookings_fetch/' + value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // all booking staff fetch
    allBookingStaffFetch(value) {
        const _base = this;
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/webservice/bookings/app_available_staffs_fetch', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // new booking add
    newBookingAdd(value) {
        const _base = this;
        console.log('booking value :', value);
        return new Promise(function (reject, resolve) {
            _base.http.post(baseUrl.baseURL + '/webservice/bookings/app_booking_add', value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }

    // get user details
    getBookings(value: any) {
        const _base = this;
        return new Promise(function (reject, resolve) {
            _base.http.get(baseUrl.baseURL + '/webservice/bookings/app_bookings_fetchById/' + value, { headers: _base.headers })
                .subscribe(error => {
                    reject(error);
                }, success => {
                    resolve(success);
                });
        });
    }
}