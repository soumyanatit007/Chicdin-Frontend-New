import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PasswordValidation } from './password-validation';
import { Broadcaster } from '../providers/eventEmitter';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserHttpService]
})
export class SignupComponent implements OnInit {

  SignUpForm: FormGroup;
  otpForm: FormGroup;

  public genders: any = [{ 'id': 'M', 'name': 'Male' }, { 'id': 'F', 'name': 'Female' }];
  public maxDate: any;
  public userDOB: any;

  public isLoading = false;
  public isLoadingResendOtp = false;

  public maxOtpSendNumber = 3;
  public initialOtpNumber = 0;
  isResendOtpShow = true;

  // registration and otp form show and hide
  isRegistrationFormShow = true;
  isOtpFormShow = false;

  // error message show variables
  isShowFirstNameErrorMessage = false;
  isShowLastNameErrorMessage = false;
  isShowEmailErrorMessage = false;
  isShowPasswordErrorMessage = false;
  isShowConfirmPasswordErrorMessage = false;
  isShowMobileErrorMessage = false;
  isShowCountryErrorMessage = false;
  isShowGenderErrorMessage = false;
  isShowDOBErrorMessage = false;
  isShowCountryCodeMessage = false;

  // user data variables
  public first_name: any;
  public last_name: any;
  public gender: any;
  public mobile: any;
  public password: any;
  public confirmed_password: any;
  public country_id: any;
  public date_of_birth: any;
  public EmailValue: any;
  public PromotionValue: any;

  isEmailCheck = false;
  isEmailWrong = false;

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  public countries: any;
  public countryCode: any = [
    // tslint:disable-next-line:max-line-length
    {
      "code": "+7 840",
      "name": "Abkhazia"
    },
    {
      "code": "+93",
      "name": "Afghanistan"
    },
    {
      "code": "+355",
      "name": "Albania"
    },
    {
      "code": "+213",
      "name": "Algeria"
    },
    {
      "code": "+1 684",
      "name": "American Samoa"
    },
    {
      "code": "+376",
      "name": "Andorra"
    },
    {
      "code": "+244",
      "name": "Angola"
    },
    {
      "code": "+1 264",
      "name": "Anguilla"
    },
    {
      "code": "+1 268",
      "name": "Antigua and Barbuda"
    },
    {
      "code": "+54",
      "name": "Argentina"
    },
    {
      "code": "+374",
      "name": "Armenia"
    },
    {
      "code": "+297",
      "name": "Aruba"
    },
    {
      "code": "+247",
      "name": "Ascension"
    },
    {
      "code": "+61",
      "name": "Australia"
    },
    {
      "code": "+672",
      "name": "Australian External Territories"
    },
    {
      "code": "+43",
      "name": "Austria"
    },
    {
      "code": "+994",
      "name": "Azerbaijan"
    },
    {
      "code": "+1 242",
      "name": "Bahamas"
    },
    {
      "code": "+973",
      "name": "Bahrain"
    },
    {
      "code": "+880",
      "name": "Bangladesh"
    },
    {
      "code": "+1 246",
      "name": "Barbados"
    },
    {
      "code": "+1 268",
      "name": "Barbuda"
    },
    {
      "code": "+375",
      "name": "Belarus"
    },
    {
      "code": "+32",
      "name": "Belgium"
    },
    {
      "code": "+501",
      "name": "Belize"
    },
    {
      "code": "+229",
      "name": "Benin"
    },
    {
      "code": "+1 441",
      "name": "Bermuda"
    },
    {
      "code": "+975",
      "name": "Bhutan"
    },
    {
      "code": "+591",
      "name": "Bolivia"
    },
    {
      "code": "+387",
      "name": "Bosnia and Herzegovina"
    },
    {
      "code": "+267",
      "name": "Botswana"
    },
    {
      "code": "+55",
      "name": "Brazil"
    },
    {
      "code": "+246",
      "name": "British Indian Ocean Territory"
    },
    {
      "code": "+1 284",
      "name": "British Virgin Islands"
    },
    {
      "code": "+673",
      "name": "Brunei"
    },
    {
      "code": "+359",
      "name": "Bulgaria"
    },
    {
      "code": "+226",
      "name": "Burkina Faso"
    },
    {
      "code": "+257",
      "name": "Burundi"
    },
    {
      "code": "+855",
      "name": "Cambodia"
    },
    {
      "code": "+237",
      "name": "Cameroon"
    },
    {
      "code": "+1",
      "name": "Canada"
    },
    {
      "code": "+238",
      "name": "Cape Verde"
    },
    {
      "code": "+ 345",
      "name": "Cayman Islands"
    },
    {
      "code": "+236",
      "name": "Central African Republic"
    },
    {
      "code": "+235",
      "name": "Chad"
    },
    {
      "code": "+56",
      "name": "Chile"
    },
    {
      "code": "+86",
      "name": "China"
    },
    {
      "code": "+61",
      "name": "Christmas Island"
    },
    {
      "code": "+61",
      "name": "Cocos-Keeling Islands"
    },
    {
      "code": "+57",
      "name": "Colombia"
    },
    {
      "code": "+269",
      "name": "Comoros"
    },
    {
      "code": "+242",
      "name": "Congo"
    },
    {
      "code": "+243",
      "name": "Congo, Dem. Rep. of (Zaire)"
    },
    {
      "code": "+682",
      "name": "Cook Islands"
    },
    {
      "code": "+506",
      "name": "Costa Rica"
    },
    {
      "code": "+385",
      "name": "Croatia"
    },
    {
      "code": "+53",
      "name": "Cuba"
    },
    {
      "code": "+599",
      "name": "Curacao"
    },
    {
      "code": "+537",
      "name": "Cyprus"
    },
    {
      "code": "+420",
      "name": "Czech Republic"
    },
    {
      "code": "+45",
      "name": "Denmark"
    },
    {
      "code": "+246",
      "name": "Diego Garcia"
    },
    {
      "code": "+253",
      "name": "Djibouti"
    },
    {
      "code": "+1 767",
      "name": "Dominica"
    },
    {
      "code": "+1 809",
      "name": "Dominican Republic"
    },
    {
      "code": "+670",
      "name": "East Timor"
    },
    {
      "code": "+56",
      "name": "Easter Island"
    },
    {
      "code": "+593",
      "name": "Ecuador"
    },
    {
      "code": "+20",
      "name": "Egypt"
    },
    {
      "code": "+503",
      "name": "El Salvador"
    },
    {
      "code": "+240",
      "name": "Equatorial Guinea"
    },
    {
      "code": "+291",
      "name": "Eritrea"
    },
    {
      "code": "+372",
      "name": "Estonia"
    },
    {
      "code": "+251",
      "name": "Ethiopia"
    },
    {
      "code": "+500",
      "name": "Falkland Islands"
    },
    {
      "code": "+298",
      "name": "Faroe Islands"
    },
    {
      "code": "+679",
      "name": "Fiji"
    },
    {
      "code": "+358",
      "name": "Finland"
    },
    {
      "code": "+33",
      "name": "France"
    },
    {
      "code": "+596",
      "name": "French Antilles"
    },
    {
      "code": "+594",
      "name": "French Guiana"
    },
    {
      "code": "+689",
      "name": "French Polynesia"
    },
    {
      "code": "+241",
      "name": "Gabon"
    },
    {
      "code": "+220",
      "name": "Gambia"
    },
    {
      "code": "+995",
      "name": "Georgia"
    },
    {
      "code": "+49",
      "name": "Germany"
    },
    {
      "code": "+233",
      "name": "Ghana"
    },
    {
      "code": "+350",
      "name": "Gibraltar"
    },
    {
      "code": "+30",
      "name": "Greece"
    },
    {
      "code": "+299",
      "name": "Greenland"
    },
    {
      "code": "+1 473",
      "name": "Grenada"
    },
    {
      "code": "+590",
      "name": "Guadeloupe"
    },
    {
      "code": "+1 671",
      "name": "Guam"
    },
    {
      "code": "+502",
      "name": "Guatemala"
    },
    {
      "code": "+224",
      "name": "Guinea"
    },
    {
      "code": "+245",
      "name": "Guinea-Bissau"
    },
    {
      "code": "+595",
      "name": "Guyana"
    },
    {
      "code": "+509",
      "name": "Haiti"
    },
    {
      "code": "+504",
      "name": "Honduras"
    },
    {
      "code": "+852",
      "name": "Hong Kong SAR China"
    },
    {
      "code": "+36",
      "name": "Hungary"
    },
    {
      "code": "+354",
      "name": "Iceland"
    },
    {
      "code": "+91",
      "name": "India"
    },
    {
      "code": "+62",
      "name": "Indonesia"
    },
    {
      "code": "+98",
      "name": "Iran"
    },
    {
      "code": "+964",
      "name": "Iraq"
    },
    {
      "code": "+353",
      "name": "Ireland"
    },
    {
      "code": "+972",
      "name": "Israel"
    },
    {
      "code": "+39",
      "name": "Italy"
    },
    {
      "code": "+225",
      "name": "Ivory Coast"
    },
    {
      "code": "+1 876",
      "name": "Jamaica"
    },
    {
      "code": "+81",
      "name": "Japan"
    },
    {
      "code": "+962",
      "name": "Jordan"
    },
    {
      "code": "+7 7",
      "name": "Kazakhstan"
    },
    {
      "code": "+254",
      "name": "Kenya"
    },
    {
      "code": "+686",
      "name": "Kiribati"
    },
    {
      "code": "+965",
      "name": "Kuwait"
    },
    {
      "code": "+996",
      "name": "Kyrgyzstan"
    },
    {
      "code": "+856",
      "name": "Laos"
    },
    {
      "code": "+371",
      "name": "Latvia"
    },
    {
      "code": "+961",
      "name": "Lebanon"
    },
    {
      "code": "+266",
      "name": "Lesotho"
    },
    {
      "code": "+231",
      "name": "Liberia"
    },
    {
      "code": "+218",
      "name": "Libya"
    },
    {
      "code": "+423",
      "name": "Liechtenstein"
    },
    {
      "code": "+370",
      "name": "Lithuania"
    },
    {
      "code": "+352",
      "name": "Luxembourg"
    },
    {
      "code": "+853",
      "name": "Macau SAR China"
    },
    {
      "code": "+389",
      "name": "Macedonia"
    },
    {
      "code": "+261",
      "name": "Madagascar"
    },
    {
      "code": "+265",
      "name": "Malawi"
    },
    {
      "code": "+60",
      "name": "Malaysia"
    },
    {
      "code": "+960",
      "name": "Maldives"
    },
    {
      "code": "+223",
      "name": "Mali"
    },
    {
      "code": "+356",
      "name": "Malta"
    },
    {
      "code": "+692",
      "name": "Marshall Islands"
    },
    {
      "code": "+596",
      "name": "Martinique"
    },
    {
      "code": "+222",
      "name": "Mauritania"
    },
    {
      "code": "+230",
      "name": "Mauritius"
    },
    {
      "code": "+262",
      "name": "Mayotte"
    },
    {
      "code": "+52",
      "name": "Mexico"
    },
    {
      "code": "+691",
      "name": "Micronesia"
    },
    {
      "code": "+1 808",
      "name": "Midway Island"
    },
    {
      "code": "+373",
      "name": "Moldova"
    },
    {
      "code": "+377",
      "name": "Monaco"
    },
    {
      "code": "+976",
      "name": "Mongolia"
    },
    {
      "code": "+382",
      "name": "Montenegro"
    },
    {
      "code": "+1664",
      "name": "Montserrat"
    },
    {
      "code": "+212",
      "name": "Morocco"
    },
    {
      "code": "+95",
      "name": "Myanmar"
    },
    {
      "code": "+264",
      "name": "Namibia"
    },
    {
      "code": "+674",
      "name": "Nauru"
    },
    {
      "code": "+977",
      "name": "Nepal"
    },
    {
      "code": "+31",
      "name": "Netherlands"
    },
    {
      "code": "+599",
      "name": "Netherlands Antilles"
    },
    {
      "code": "+1 869",
      "name": "Nevis"
    },
    {
      "code": "+687",
      "name": "New Caledonia"
    },
    {
      "code": "+64",
      "name": "New Zealand"
    },
    {
      "code": "+505",
      "name": "Nicaragua"
    },
    {
      "code": "+227",
      "name": "Niger"
    },
    {
      "code": "+234",
      "name": "Nigeria"
    },
    {
      "code": "+683",
      "name": "Niue"
    },
    {
      "code": "+672",
      "name": "Norfolk Island"
    },
    {
      "code": "+850",
      "name": "North Korea"
    },
    {
      "code": "+1 670",
      "name": "Northern Mariana Islands"
    },
    {
      "code": "+47",
      "name": "Norway"
    },
    {
      "code": "+968",
      "name": "Oman"
    },
    {
      "code": "+92",
      "name": "Pakistan"
    },
    {
      "code": "+680",
      "name": "Palau"
    },
    {
      "code": "+970",
      "name": "Palestinian Territory"
    },
    {
      "code": "+507",
      "name": "Panama"
    },
    {
      "code": "+675",
      "name": "Papua New Guinea"
    },
    {
      "code": "+595",
      "name": "Paraguay"
    },
    {
      "code": "+51",
      "name": "Peru"
    },
    {
      "code": "+63",
      "name": "Philippines"
    },
    {
      "code": "+48",
      "name": "Poland"
    },
    {
      "code": "+351",
      "name": "Portugal"
    },
    {
      "code": "+1 787",
      "name": "Puerto Rico"
    },
    {
      "code": "+974",
      "name": "Qatar"
    },
    {
      "code": "+262",
      "name": "Reunion"
    },
    {
      "code": "+40",
      "name": "Romania"
    },
    {
      "code": "+7",
      "name": "Russia"
    },
    {
      "code": "+250",
      "name": "Rwanda"
    },
    {
      "code": "+685",
      "name": "Samoa"
    },
    {
      "code": "+378",
      "name": "San Marino"
    },
    {
      "code": "+966",
      "name": "Saudi Arabia"
    },
    {
      "code": "+221",
      "name": "Senegal"
    },
    {
      "code": "+381",
      "name": "Serbia"
    },
    {
      "code": "+248",
      "name": "Seychelles"
    },
    {
      "code": "+232",
      "name": "Sierra Leone"
    },
    {
      "code": "+65",
      "name": "Singapore"
    },
    {
      "code": "+421",
      "name": "Slovakia"
    },
    {
      "code": "+386",
      "name": "Slovenia"
    },
    {
      "code": "+677",
      "name": "Solomon Islands"
    },
    {
      "code": "+27",
      "name": "South Africa"
    },
    {
      "code": "+500",
      "name": "South Georgia and the South Sandwich Islands"
    },
    {
      "code": "+82",
      "name": "South Korea"
    },
    {
      "code": "+34",
      "name": "Spain"
    },
    {
      "code": "+94",
      "name": "Sri Lanka"
    },
    {
      "code": "+249",
      "name": "Sudan"
    },
    {
      "code": "+597",
      "name": "Suriname"
    },
    {
      "code": "+268",
      "name": "Swaziland"
    },
    {
      "code": "+46",
      "name": "Sweden"
    },
    {
      "code": "+41",
      "name": "Switzerland"
    },
    {
      "code": "+963",
      "name": "Syria"
    },
    {
      "code": "+886",
      "name": "Taiwan"
    },
    {
      "code": "+992",
      "name": "Tajikistan"
    },
    {
      "code": "+255",
      "name": "Tanzania"
    },
    {
      "code": "+66",
      "name": "Thailand"
    },
    {
      "code": "+670",
      "name": "Timor Leste"
    },
    {
      "code": "+228",
      "name": "Togo"
    },
    {
      "code": "+690",
      "name": "Tokelau"
    },
    {
      "code": "+676",
      "name": "Tonga"
    },
    {
      "code": "+1 868",
      "name": "Trinidad and Tobago"
    },
    {
      "code": "+216",
      "name": "Tunisia"
    },
    {
      "code": "+90",
      "name": "Turkey"
    },
    {
      "code": "+993",
      "name": "Turkmenistan"
    },
    {
      "code": "+1 649",
      "name": "Turks and Caicos Islands"
    },
    {
      "code": "+688",
      "name": "Tuvalu"
    },
    {
      "code": "+1 340",
      "name": "U.S. Virgin Islands"
    },
    {
      "code": "+256",
      "name": "Uganda"
    },
    {
      "code": "+380",
      "name": "Ukraine"
    },
    {
      "code": "+971",
      "name": "United Arab Emirates"
    },
    {
      "code": "+44",
      "name": "United Kingdom"
    },
    {
      "code": "+1",
      "name": "United States"
    },
    {
      "code": "+598",
      "name": "Uruguay"
    },
    {
      "code": "+998",
      "name": "Uzbekistan"
    },
    {
      "code": "+678",
      "name": "Vanuatu"
    },
    {
      "code": "+58",
      "name": "Venezuela"
    },
    {
      "code": "+84",
      "name": "Vietnam"
    },
    {
      "code": "+1 808",
      "name": "Wake Island"
    },
    {
      "code": "+681",
      "name": "Wallis and Futuna"
    },
    {
      "code": "+967",
      "name": "Yemen"
    },
    {
      "code": "+260",
      "name": "Zambia"
    },
    {
      "code": "+255",
      "name": "Zanzibar"
    },
    {
      "code": "+263",
      "name": "Zimbabwe"
    }
  ];

  @ViewChild('otp1') otp1Element: ElementRef;
  @ViewChild('otp2') otp2Element: ElementRef;
  @ViewChild('otp3') otp3Element: ElementRef;
  @ViewChild('otp4') otp4Element: ElementRef;

  constructor(public http: UserHttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    public broadcast: Broadcaster) {
    const date = new Date();
    this.maxDate = new Date(date.setDate(date.getDate() - 365 * 10));
    console.log('maxDate :', this.maxDate);
  }

  ngOnInit() {
    this.SignUpForm = this.fb.group({
      'first_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'last_name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmed_password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'countryCode': {value: '', disabled: true},
      'mobile': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      'country': ['', Validators.compose([Validators.required])],
      'gender': ['', Validators.compose([Validators.required])],
      'date_of_birth': [null, Validators.compose([Validators.required])],
      'is_promotional_mail_received': ''
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );

    this.otpForm = this.fb.group({
      'otp1': ['', Validators.compose([Validators.required])],
      'otp2': ['', Validators.compose([Validators.required])],
      'otp3': ['', Validators.compose([Validators.required])],
      'otp4': ['', Validators.compose([Validators.required])]
    });

    /**get countries from server */
    this.http.getCountryList().then((data: any) => {
      this.countries = data.countries;
    }).catch((error: any) => {
    });

    // email existance check
    this.SignUpForm.get('email').valueChanges
      .subscribe((emailValue: any) => {
        console.log('emailValue :', emailValue);
        this.emailCheck(emailValue);
        this.isEmailCheck = false;
        this.isEmailWrong = false;
      });

    // promotion value
    this.SignUpForm.get('is_promotional_mail_received').valueChanges
      .subscribe((promotionValue: any) => {
        console.log('promotionValue :', promotionValue);
        if (promotionValue === true) {
          this.PromotionValue = 1;
        } else if (promotionValue === false) {
          this.PromotionValue = 0;
        }
      });


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

    this.SignUpForm.get('country').valueChanges.subscribe((data) => {
      this.countries.forEach((value: any) => {
        if (data === value.id) {
          this.countryCode.forEach((Data) => {
            if (value.name === Data.name) {
              console.log(Data.code);
              this.SignUpForm.controls['countryCode'].setValue(Data.code);
            }
          });
        }
      });
    });
  }

  firstNameErrorMessage() {
    this.isShowFirstNameErrorMessage = !this.isShowFirstNameErrorMessage;
  }

  lastNameErrorMessage() {
    this.isShowLastNameErrorMessage = !this.isShowLastNameErrorMessage;
  }

  emailErrorMessage() {
    this.isShowEmailErrorMessage = !this.isShowEmailErrorMessage;
  }

  passwordErrorMessage() {
    this.isShowPasswordErrorMessage = !this.isShowPasswordErrorMessage;
  }

  confirmPasswordErrorMessage() {
    this.isShowConfirmPasswordErrorMessage = !this.isShowConfirmPasswordErrorMessage;
  }

  countryCodeErrorMessage() {
    this.isShowCountryCodeMessage = !this.isShowCountryCodeMessage;
  }

  mobileErrorMessage() {
    this.isShowMobileErrorMessage = !this.isShowMobileErrorMessage;
  }

  countrySelectErrorMessage() {
    this.isShowCountryErrorMessage = !this.isShowCountryErrorMessage;
  }

  genderSelectErrorMessage() {
    this.isShowGenderErrorMessage = !this.isShowGenderErrorMessage;
  }

  dobSelectErrorMessage() {
    this.isShowDOBErrorMessage = !this.isShowDOBErrorMessage;
  }

  // emailCheck with regex
  emailCheck(email: any) {
    // tslint:disable-next-line:max-line-length
    const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (EmailRegex.test(email)) {
      this.EmailValue = email;
      console.log('this.EmailValue :', this.EmailValue);
      const data = {
        email: this.EmailValue
      };
      this.http.emailExistanceCheck(data).then((success: any) => {
        console.log('emailValue success :', success);
        if (success.ack === 0) {
          this.isEmailCheck = true;
          this.isEmailWrong = false;
        } else if (success.ack === 1) {
          this.isEmailWrong = true;
          this.isEmailCheck = false;
        }
      }).catch((error: any) => {
        console.log('error :', error);
      });
    } else if (!EmailRegex.test(email)) {
      console.log('invalid email');
    }
  }

  /** user signup and otp send */
  signUp(value) {
    this.isLoading = true;
    console.log('signup value :', value);

    // convert user DOB from datepicker
    this.userDOB = value.date_of_birth.getFullYear() + '-' + (value.date_of_birth.getMonth() + 1) + '-' + value.date_of_birth.getDate();
    console.log(this.userDOB);


    this.first_name = value.first_name;
    this.last_name = value.last_name;
    this.gender = value.gender;
    this.mobile = value.mobile;
    this.password = value.password;
    this.confirmed_password = value.confirmed_password;
    this.country_id = value.country;
    this.date_of_birth = this.userDOB;

    /** send otp to user email and email existance check
     * email:String
    */
    const data = {
      email: this.EmailValue
    };
    this.http.otpSendAfterEmailVerified(data).then((result: any) => {
      console.log('result :', result);
      if (result.ack === '0') {
        this.isRegistrationFormShow = false;
        this.isOtpFormShow = true;

        this.toastr.error('Otp send failed', 'Error', {
          timeOut: 3000
        });
        this.isLoading = false;
      } else if (result.ack === '1') {
        window.scrollTo(0, 0);
        this.isRegistrationFormShow = false;
        this.isOtpFormShow = true;

        this.toastr.success(result.msg, 'Success', {
          timeOut: 3000
        });
        this.isLoading = false;
      }
    }).catch((error: any) => {
      console.log('error :', error);
      this.isLoading = false;
    });
  }

  /** submit otp and user registration */
  submitOtp(value) {
    this.isLoading = true;
    const otp = value.otp1 + value.otp2 + value.otp3 + value.otp4 + value.otp5 + value.otp6;
    const OTP = parseInt(otp, 10);

    const data = {
      email: this.EmailValue,
      otp: OTP
    };
    this.http.OtpMatch(data).then((success: any) => {
      console.log('fp otp submit res :', success);
      if (success.ack === '0') {
        this.toastr.error(success.msg, 'Error', {
          timeOut: 5000
        });
        this.isLoading = false;
      } else if (success.ack === '1') {

        // user registration
        const dataTwo = {
          first_name: this.first_name,
          last_name: this.last_name,
          gender: this.gender,
          mobile: this.mobile,
          email: this.EmailValue,
          password: this.password,
          confirmed_password: this.confirmed_password,
          country_id: this.country_id,
          date_of_birth: this.date_of_birth,
          is_promotional_mail_received: this.PromotionValue
        };

        this.http.signUp(dataTwo).then((successOne: any) => {
          console.log('success :', successOne);
          if (successOne.ack === '0') {
            this.toastr.error(successOne.msg, 'Error', {
              timeOut: 3000
            });
            this.isLoading = false;
          } else if (successOne.ack === '1') {
            this.toastr.success(successOne.msg, 'Success', {
              timeOut: 3000
            });
            this.isLoading = false;
            this.router.navigate(['/login']);
          }
          // this.isLoading = false;
        }).catch((error) => {
          console.log('error :', error);
          this.isLoading = false;
          this.toastr.error('Please try again later..', 'Error', {
            timeOut: 3000
          });
        });
      }
    }).catch((error: any) => {
      this.isLoading = false;
      console.log('error :', error);
      this.toastr.error('Please try again later..', 'Error', {
        timeOut: 3000
      });
    });
  }

  /** resend otp */
  resendOtp() {
    this.isLoadingResendOtp = true;
    this.initialOtpNumber++;
    if (this.initialOtpNumber !== this.maxOtpSendNumber) {
      this.isResendOtpShow = true;
      const data = {
        email: this.EmailValue
      };
      this.http.otpSendAfterEmailVerified(data).then((success: any) => {
        console.log('resend otp res :', success);
        if (success.ack === '0') {
          this.toastr.error(success.msg, 'Error', {
            timeOut: 3000
          });
          this.isLoadingResendOtp = false;
        } else if (success.ack === '1') {
          this.toastr.success(success.msg, 'Success', {
            timeOut: 3000
          });
          this.isLoadingResendOtp = false;
        }
      }).catch((error: any) => {
        this.isLoadingResendOtp = false;
        console.log('error :', error);
        this.toastr.error('Please try again later..', 'Error', {
          timeOut: 3000
        });
      });
      // this.isLoadingResendOtp = false;
    } else if (this.initialOtpNumber === this.maxOtpSendNumber) {
      this.isLoadingResendOtp = true;
      this.isResendOtpShow = true;
      const data = {
        email: this.EmailValue
      };
      this.http.otpSendAfterEmailVerified(data).then((success: any) => {
        console.log('resend otp res :', success);
        if (success.ack === '0') {
          this.toastr.error(success.msg, 'Error', {
            timeOut: 3000
          });
          this.isLoadingResendOtp = false;
        } else if (success.ack === '1') {
          this.toastr.success(success.msg, 'Success', {
            timeOut: 3000
          });
          this.isLoadingResendOtp = false;
          this.isResendOtpShow = false;
        }
      }).catch((error: any) => {
        this.isLoadingResendOtp = false;
        console.log('error :', error);
        this.toastr.error('Please try again later..', 'Error', {
          timeOut: 3000
        });
      });
    }
  }

}
