import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/filter';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from "jquery";
import { NgProgress } from 'ngx-progressbar';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
// declare let google: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [UserHttpService]
})

export class DetailsComponent implements OnInit {
  testhtml = '<a>5test</a>';
  test: any;

  public initial_service_quantity = 0;

  public galleryOptions = [];
  public galleryImages = [];

  public companyDetailsResultServices: any;
  public companyServiceLength: any;
  public companyName: any;
  public companyLocation: any;
  public companyDescription: any;
  public mapLocation: any;
  public vendor_locations: any;

  public initialLatitude: any = 18.5793;
  public initialLongitude: any = 73.8143;

  public company_slug: any;
  public service_id: any;

  public isOpen = true;
  public isDefaultImage = true;

  public index: any;
  public isShowAddCart = [];
  public isShowRemove = [];

  public service_Ids: any = [];
  public isBookNowButton = true;

  public allServiceData: any = [];
  public Ids: any = [];

  public isServiceData: any = false;
  public localStorageServices: any;

  public selectedLocation: any;

  public locationLat: any;
  public locationLong: any;
  public current_gmdate: any;
  public offday: any;

  public vendorDistanceResponse: any = [];
  public distanceRes: any = [];
  public reviewmassage :any;
  public customer:any;
  public company_id:any;
  constructor(
    public toastr:ToastrService,
    public http: UserHttpService,
    public router: Router,
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public ngProgress: NgProgress) {
    window.scrollTo(0, 0);
    this.test = this._sanitizer.bypassSecurityTrustHtml(this.testhtml);
  }

  ngOnInit() {
    if (localStorage.getItem('UserData')) {
      this.customer = JSON.parse(localStorage.getItem('UserData'));
    }
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];


    this.ngProgress.start();
    this.route.queryParams.subscribe((params: any) => {
      this.company_slug = params["company-name"];
      this.offday = params["offday"];
      this.http.companyDetailsFetch(this.company_slug, this.offday).then((success: any) => {
        console.log('success :', success);
        this.current_gmdate = success.result.current_gmdate;
        if (success.ack === 1) {
          this.company_id = success.result.company_details[0].id;
          this.ngProgress.done();
          if (success.result.services.length > 0) {
            this.companyDetailsResultServices = success.result.services;
          }
          if (localStorage.getItem("location1")) {
            this.locationLat = parseFloat(JSON.parse(localStorage.getItem("location1")).lat);
            this.locationLong = parseFloat(JSON.parse(localStorage.getItem("location1")).long);
          }
          if (success.result.vendor_locations.length > 0) {
            this.vendor_locations = success.result.vendor_locations;
            success.result.vendor_locations.map((locationResponse: any) => {
              // console.log(locationResponse);
              const vendorLocationLat = parseFloat(locationResponse.latitude);
              const vendorLocationLong = parseFloat(locationResponse.longitude);
              const vendorId = locationResponse.id;
              const dist = (this.calculateDistance(this.locationLat, this.locationLong, vendorLocationLat, vendorLocationLong)).toFixed(2);
              const newDist = parseFloat(dist);
              const dataOne = {
                "id": vendorId,
                "distance": newDist
              };
              this.vendorDistanceResponse.push(dataOne);
            });
            this.vendorDistanceResponse.map((valueOne: any) => {
              this.distanceRes.push(valueOne.distance);
              const smaller = Math.min.apply(Math, this.distanceRes);
              if (valueOne.distance === smaller) {
                this.selectedLocation = valueOne.id;
                console.log("selectedLocation :", this.selectedLocation);
                this.vendor_locations.forEach((dataTwo: any) => {
                  if (this.selectedLocation === dataTwo.id) {
                    localStorage.setItem("vendorLocation",
                      JSON.stringify({
                        vendorDetails: dataTwo,
                        current_gmdate: this.current_gmdate
                      }));
                  }
                });
                // console.log("this.selectedLocation :", this.selectedLocation);
              }
            });
          }
          // console.log("companyDetailsResultServices :", this.companyDetailsResultServices);
          for (let i = 0; i < this.companyDetailsResultServices.length; i++) {
            this.isShowAddCart[i] = true;
            this.isShowRemove[i] = false;
          }
          this.companyDetailsResultServices.forEach((successOne: any) => {
            this.Ids.push(successOne.service_id);
            // console.log("Ids :", this.Ids);
          });
          this.companyServiceLength = success.result.services.length;

          this.companyName = success.result.company_details[0].name ? success.result.company_details[0].name : '';
          this.companyLocation = success.result.company_details[0].address ? ' - ' + success.result.company_details[0].address : '';
          this.mapLocation = success.result.company_details[0].address ? success.result.company_details[0].address : '';
          // tslint:disable-next-line:max-line-length
          this.initialLatitude = success.result.company_details[0].latitude ? parseFloat(success.result.company_details[0].latitude) : '';
          // tslint:disable-next-line:max-line-length
          this.initialLongitude = success.result.company_details[0].longitude ? parseFloat(success.result.company_details[0].longitude) : '';
          this.companyDescription = success.result.company_details[0].description ? success.result.company_details[0].description : '';

          if (localStorage.getItem("services")) {
            this.isServiceData = true;
            this.localStorageServices = JSON.parse(localStorage.getItem("services"));
            const companyName = JSON.parse(localStorage.getItem("services")).companyName;

            if (companyName === this.companyName) {
              this.service_Ids = JSON.parse(localStorage.getItem("services")).serviceIds;
              this.allServiceData = JSON.parse(localStorage.getItem("services")).serviceData;
              this.initial_service_quantity = JSON.parse(localStorage.getItem("services")).initial_service_quantity;
              if (JSON.parse(localStorage.getItem("services")).serviceData) {
                JSON.parse(localStorage.getItem("services")).serviceData.forEach((successTwo: any) => {
                  // console.log("successTwo :", successTwo.service_id);
                  const i = this.Ids.indexOf(successTwo.service_id);
                  // console.log("i :", i);
                  this.isBookNowButton = false;
                  this.isShowAddCart[i] = false;
                  this.isShowRemove[i] = true;
                });
              }
            } else {
              this.isServiceData = false;
              localStorage.removeItem("services");
            }
          }
        } else if (success.ack === 0) {
          this.ngProgress.done();
        }
      }).catch((error: any) => {
        this.ngProgress.done();
        console.log('error :', error);
      });

      // compant image fetch
      this.http.compantImageFetch(this.company_slug).then((success: any) => {
        if (success.ack === 1) {
          success.result.map((data: any) => {
            this.isDefaultImage = false;
            const dataOne = {
              small: data.image,
              medium: data.image,
              big: data.image
            };
            this.galleryImages.push(dataOne);
          });
        } else if (success.ack === 0) {
          this.isDefaultImage = true;
          // console.log('no image');
        }
      }).catch((error: any) => {
        console.log('error :', error);
      });
    });
  }

  // vendor location id on change
  onChange(value: any) {
    this.selectedLocation = value;
    this.vendor_locations.forEach((dataTwo: any) => {
      if (this.selectedLocation === dataTwo.id) {
        localStorage.setItem("vendorLocation", JSON.stringify({
          vendorDetails: dataTwo,
          current_gmdate: this.current_gmdate
        }));
      }
    });
  }

  // calculate distance
  public calculateDistance(lat11, lon1, lat22, lon2) {
    const R = 6371; // km
    const dLat = (lat22 - lat11) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat111 = (lat11) * Math.PI / 180;
    const lat222 = (lat22) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat111) * Math.cos(lat222);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  // services added to cart
  service_added_to_cart(value: any, index: any) {
    console.log("value :", value);
    this.index = index;
    const id = value.service_id;
    this.isShowAddCart[index] = false;
    this.isShowRemove[index] = true;
    this.initial_service_quantity = this.initial_service_quantity + 1;
    if (id && this.isServiceData === false) {
      this.service_Ids.push(id);
      this.allServiceData.push(value);
      console.log("this.service_Ids :", this.service_Ids);
      this.isBookNowButton = false;
      // tslint:disable-next-line:max-line-length
      localStorage.setItem('services', JSON.stringify({
        serviceIds: this.service_Ids,
        company_slug: this.company_slug,
        serviceData: this.allServiceData,
        companyName: this.companyName,
        companyLocation: this.companyLocation,
        initial_service_quantity: this.initial_service_quantity
      }));
      console.log(JSON.parse(localStorage.getItem('services')));
    }
    if (id && this.isServiceData === true) {
      console.log(this.localStorageServices);
      if (localStorage.getItem("services")) {
        this.service_Ids = JSON.parse(localStorage.getItem("services")).serviceIds;
        this.service_Ids.push(id);
        this.allServiceData = JSON.parse(localStorage.getItem("services")).serviceData;
        this.allServiceData.push(value);
        console.log("this.service_Ids :", this.service_Ids);
        localStorage.setItem('services', JSON.stringify({
          serviceIds: this.service_Ids,
          company_slug: this.company_slug,
          serviceData: this.allServiceData,
          companyName: this.companyName,
          companyLocation: this.companyLocation,
          initial_service_quantity: this.initial_service_quantity
        }));
        console.log(JSON.parse(localStorage.getItem('services')));
      }
    }
  }

  // service delete to cart
  service_delete_to_cart(value: any, index: any) {
    this.index = index;
    const id = value.service_id;
    let valueIndex: any;
    this.isShowAddCart[index] = true;
    this.isShowRemove[index] = false;
    this.initial_service_quantity = this.initial_service_quantity - 1;

    valueIndex = this.service_Ids.indexOf(id);
    this.service_Ids.splice(valueIndex, 1);
    this.allServiceData.splice(valueIndex, 1);
    console.log("this.service_Ids :", this.service_Ids);
    console.log("this.allServiceData :", this.allServiceData);
    // tslint:disable-next-line:max-line-length
    localStorage.setItem('services', JSON.stringify({
      serviceIds: this.service_Ids,
      company_slug: this.company_slug,
      serviceData: this.allServiceData,
      companyName: this.companyName,
      companyLocation: this.companyLocation,
      initial_service_quantity: this.initial_service_quantity
    }));
    console.log(JSON.parse(localStorage.getItem('services')));

    if (this.service_Ids.length === 0) {
      this.isBookNowButton = true;
      this.isServiceData = false;
      localStorage.removeItem("services");
    }
  }

  // book now button
  bookNow() {
    this.router.navigate(['/startbooking']);
  }

  submitreview(){
    const reviewData = {
      company_id: this.company_id,
      user_id: this.customer.id,
      rating: '4',
      comment: this.reviewmassage
    };
    this.http.newReviewAdd(reviewData).then((success_one: any) => {
      if (success_one.ack === 1) {
        this.reviewmassage = "";
        this.toastr.success(success_one.msg, 'Success', {
          timeOut: 5000
        });
      } else if (success_one.ack === 0) {
        this.toastr.error(success_one.msg, 'Error', {
          timeOut: 2000
        });
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
