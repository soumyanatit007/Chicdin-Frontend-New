import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserHttpService } from '../providers/user.Service';
import { Router, NavigationEnd, NavigationExtras } from '@angular/router';
declare let google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserHttpService]
})
export class HomeComponent implements OnInit {
  content: '';
  modalRef: BsModalRef;

  SearchService: FormGroup;

  public initial_search_image: any = "https://user-images.githubusercontent.com/4941848/26845462-2d3750c2-4aff-11e7-8072-211b4c34b523.png";
  public loader_image: any = "http://superstorefinder.net/support/wp-content/uploads/2018/01/blue_loading.gif";

  userSettings: any = {
    inputPlaceholderText: 'Please type to search for location',
    showRecentSearch: false,
    searchIconUrl: this.initial_search_image,
    showSearchButton: true
  };

  public lat: any;
  public long: any;

  public keyword_type: any;
  public keyword: any;
  public keyword_slug: any;
  public title: any;

  public location: any;
  public items: any = [];

  constructor(private modalService: BsModalService,
    private translate: TranslateService,
    private fb: FormBuilder,
    public http: UserHttpService,
    public router: Router) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
  ngOnInit() {
    this.SearchService = this.fb.group({
      'service': ''
    });

    // getting location
    this.getInitialGeoLocation();

    this.SearchService.get('service').valueChanges
      .subscribe((data) => {
        // console.log('len :', data.length);
        if (data.length > 2) {
          const dataOne = {
            search: data
          };
          this.http.serviceSearch(dataOne).then((success: any) => {
            console.log('success :', success);
            if (success.ack === 0) {
              console.log('no record found');
            } else if (success.ack === 1) {
              this.items = success.result;
            }
          }).catch((error: any) => {
            console.log('error :', error);
          });
        } else if (data.length === 0) {
          this.items = [];
        } else {
          console.log('not search');
        }
      });
  }

  // get initial location
  public getInitialGeoLocation() {
    const _base = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;

        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(this.lat, this.long);
        const request = {
          latLng: latlng
        };
        geocoder.geocode(request, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
              this.location = results[0].address_components[results[0].address_components.length - 4].short_name;
              localStorage.setItem('location1', JSON.stringify({ lat: this.lat, long: this.long }));
              localStorage.setItem('location', this.location);
              console.log("initial location :", localStorage.getItem("location"));
            } else {
              console.log('No address available');
            }
          }
        });
      }, function (error) {
        if (error.code === error.PERMISSION_DENIED) {
          console.log('permission denied');
          _base.userSettings.showSearchButton = false;
          _base.userSettings = Object.assign({}, _base.userSettings);
        }
      });
    }
  }

  // get location on button click of auto complete
  public getGeoLocation() {
    const _base = this;
    if (navigator.geolocation) {
      _base.userSettings.searchIconUrl = _base.loader_image;
      _base.userSettings = Object.assign({}, _base.userSettings);
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;

        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(this.lat, this.long);
        const request = {
          latLng: latlng
        };
        geocoder.geocode(request, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
              this.location = results[0].address_components[results[0].address_components.length - 4].short_name;
              localStorage.setItem('location1', JSON.stringify({ lat: this.lat, long: this.long }));
              localStorage.setItem('location', this.location);
              console.log("location :", localStorage.getItem("location"));
              _base.userSettings['inputPlaceholderText'] = this.location;
              _base.userSettings.searchIconUrl = _base.initial_search_image;
              _base.userSettings = Object.assign({}, _base.userSettings);
            } else {
              console.log('No address available');
            }
          }
        });
      }, function (error) {
        if (error.code === error.PERMISSION_DENIED) {
          console.log('permission denied');
        }
      });
    }
  }

  autoCompleteCallback1(selectedData: any) {
    const _base = this;
    console.log('selectedData :', selectedData);
    if (selectedData.response === true) {
      this.lat = selectedData.data.geometry.location.lat;
      this.long = selectedData.data.geometry.location.lng;

      this.location = selectedData.data.address_components[selectedData.data.address_components.length - 4].short_name;
      localStorage.setItem('location', this.location);
      localStorage.setItem('location1', JSON.stringify({ lat: this.lat, long: this.long }));
    } else if (selectedData.response === false) {
      // getting location
      this.getGeoLocation();
    }
  }

  selectItem(value: any) {
    if (value) {
      console.log('value :', value);
      this.keyword = value.keyword;
      this.keyword_type = value.keyword_type;
      this.keyword_slug = value.keyword_slug;
      this.title = value.title;

      this.SearchService.controls['service'].setValue(value.title);
      this.items = [];
    }
  }

  search() {
    if (this.location) {

    } else {
      localStorage.removeItem('location');
    }
    if (this.keyword && this.keyword_type && this.keyword_slug && this.lat && this.long) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'keyword': this.keyword,
          'keyword_type': this.keyword_type,
          'keyword_slug': this.keyword_slug,
          'lat': this.lat,
          'long': this.long,
          'title': this.title
        }
      };
      this.router.navigate(['/categorySearch'], navigationExtras);
    } else if (this.lat && this.long) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'keyword': '',
          'keyword_type': '',
          'keyword_slug': '',
          'lat': this.lat,
          'long': this.long,
          'title': this.title
        }
      };
      this.router.navigate(['/categorySearch'], navigationExtras);
    } else if (this.keyword && this.keyword_type && this.keyword_slug) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'keyword': this.keyword,
          'keyword_type': this.keyword_type,
          'keyword_slug': this.keyword_slug,
          'lat': '',
          'long': '',
          'title': this.title
        }
      };
      this.router.navigate(['/categorySearch'], navigationExtras);
    } else {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'keyword': '',
          'keyword_type': '',
          'keyword_slug': '',
          'lat': '',
          'long': '',
          'title': this.title
        }
      };
      this.router.navigate(['/categorySearch'], navigationExtras);
    }
  }

  changeLanguage() {
    const lang = this.translate.getDefaultLang();
    if (lang === 'fr') {
      this.translate.setDefaultLang('ar');
      this.translate.use('ar');
    } else if (lang === 'ar') {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    } else {
      this.translate.setDefaultLang('fr');
      this.translate.use('fr');
    }

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
