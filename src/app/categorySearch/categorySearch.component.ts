import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/filter';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { NgProgress } from 'ngx-progressbar';
declare var $: any;


@Component({
  selector: 'app-categorySearch',
  templateUrl: './categorySearch.component.html',
  styleUrls: ['./categorySearch.component.scss'],
  providers: [UserHttpService]
})

export class CategorySearchComponent implements OnInit {

  categoryService: FormGroup;

  public SearchResult: any;
  public searchResultLength: any;

  public initialvalue: any = 0;
  public maxvalue: any = 5;

  public message: any;
  public subcategories: any = [];
  public subCategoriesLength: any;
  public isShowButton = true;

  public initialResult: any;
  public initialLength: any;

  public selectedIds: any = [];

  public minPrice: any;
  public maxPrice: any;
  public isShowPrice = false;

  public keyword: any;
  public keyword_type: any;
  public keyword_slug: any;
  public lat: any;
  public long: any;
  public title: any;

  public Price_min: any;
  public Price_max: any;

  public initialItem: any;
  public totalItems = 0;
  public currentPage: any;

  public location: any;
  public isShowDetails = true;

  datePickup: FormGroup;
  public bsValue = new Date();
  public date_value: any;

  constructor(
    public http: UserHttpService,
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public ngProgress: NgProgress) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {

    this.datePickup = this.fb.group({
      selected_date: ""
    });

    this.location = localStorage.getItem('location');
    this.route.queryParams.subscribe((params: any) => {
      // const success = JSON.parse(params["result"]);
      this.keyword = params["keyword"];
      this.keyword_type = params["keyword_type"];
      this.keyword_slug = params["keyword_slug"];
      this.lat = params["lat"];
      this.long = params["long"];
      this.title = params["title"];

      this.ngProgress.start();
      const data = {
        keyword_type: this.keyword_type ? this.keyword_type : '',
        keyword_slug: this.keyword_slug ? this.keyword_slug : '',
        keyword: this.keyword ? this.keyword : '',
        latitude: this.lat ? this.lat : '',
        longitude: this.long ? this.long : '',
        page: "1"
      };

      this.http.search(data).then((success: any) => {
        console.log('success :', success);
        if (success.ack === 1) {
          this.ngProgress.done();
          this.isShowDetails = true;
          this.initialResult = success.result;
          this.SearchResult = this.initialResult;
          console.log(this.SearchResult);

          this.initialItem = parseInt(success.total_rows, 10);
          this.totalItems = this.initialItem;
        } else if (success.ack === 0) {
          this.ngProgress.done();
          this.isShowDetails = false;
          console.log('not found');
        }
      }).catch((error: any) => {
        this.ngProgress.done();
        console.log('error :', error);
      });
      if (!this.title && this.location === null) {
        this.message = 'Search result(s)';
      } else if (!this.title && this.location) {
        this.message = 'Showing result(s) for' + ' ' + this.location;
      } else if (this.title && location === null) {
        this.message = 'Showing result(s) for' + ' ' + this.title;
      } else if (this.title && this.location) {
        this.message = 'Showing result(s) for' + ' ' + this.title + ' ' + 'in' + ' ' + this.location;
      }
    });

    this.http.fetchingCatagories().then((success: any) => {
      const mainCategories = success.result;
      mainCategories.map((value: any) => {
        value.subcategory.map((data: any) => {
          this.subcategories.push(data);
          this.subCategoriesLength = this.subcategories.length;
        });
      });
    }).catch((error: any) => {
      console.log('error :', error);
    });

    // date picker
    this.datePickup.get('selected_date').valueChanges
      .subscribe((value: any) => {
        if (value !== null) {
          // convert selected date into gmt date
          const date = new Date(value.getTime() + (value.getTimezoneOffset() * 60000));
          this.date_value = (date.getDay()) + 1;
          const data = {
            category_id: "",
            service_date: '',
            price_min: '',
            price_max: '',
            sort: "1",
            page: "1",
            off_days: this.date_value
          };
          this.ngProgress.start();
          this.http.serviceFilter(data).then((success: any) => {
            console.log('select service success :', success);
            if (success.ack === 1) {
              this.ngProgress.done();
              this.SearchResult = success.result;
              this.totalItems = parseInt(success.total_rows, 10);
            } else if (success.ack === 0) {
              this.ngProgress.done();
              console.log("Not filtered");
            }
          }).catch((error: any) => {
            this.ngProgress.done();
            console.log('error :', error);
          });
        }
      });
  }


  showCategories() {
    console.log('this.subCategoriesLength :', this.subCategoriesLength);
    this.maxvalue = this.maxvalue + 5;
    console.log('this.maxvalue :', this.maxvalue);
    const serviceLeft = this.subCategoriesLength - this.maxvalue;
    console.log('serviceLeft :', serviceLeft);
    if (serviceLeft < 5) {
      console.log(this.maxvalue + serviceLeft);
      if ((this.maxvalue + serviceLeft) === this.subCategoriesLength) {
        this.isShowButton = false;
      }
    }
  }

  selectService(isChecked: any, value: any) {
    this.ngProgress.start();
    // console.log('isChecked :', isChecked);
    // console.log('value :', value);
    let index: any;
    if (isChecked === true) {
      this.selectedIds.push(value.id);
    } else if (isChecked === false) {
      index = this.selectedIds.indexOf(value.id);
      this.selectedIds.splice(index, 1);
    }

    if (this.selectedIds.length !== 0) {
      this.isShowDetails = true;
      // if (this.selectedIds.length === 1) {
      //   this.message = 'Showing result(s) for' + ' ' + value.name + ' ' + 'in' + ' ' + this.location;
      // } else if (this.selectedIds.length > 1) {
      //   this.message = 'Showing result(s) for' + ' ' + this.location;
      // }
      this.message = 'Showing result(s) for' + ' ' + this.location;
      const dataOne = {
        category_id: this.selectedIds.toString(),
        service_date: '',
        price_min: '',
        price_max: '',
        sort: "1",
        page: "1",
        off_days: this.date_value ? this.date_value : ""
      };
      this.http.serviceFilter(dataOne).then((success: any) => {
        console.log('select service success :', success);
        if (success.ack === 1) {
          this.ngProgress.done();
          this.isShowPrice = true;
          this.minPrice = success.min_price;
          this.maxPrice = success.max_price;
          this.SearchResult = success.result;
          this.totalItems = parseInt(success.total_rows, 10);
          // this.searchResultLength = success.result.length;
        } else if (success.ack === 0) {
          this.ngProgress.done();
          console.log("Not filtered");
        }
      }).catch((error: any) => {
        this.ngProgress.done();
        console.log('error :', error);
      });
    } else if (this.selectedIds.length === 0) {
      this.ngProgress.done();
      this.isShowPrice = false;

      if (!this.title && this.location === null) {
        this.message = 'Search result(s)';
      } else if (!this.title && this.location) {
        this.message = 'Showing result(s) for' + ' ' + this.location;
      } else if (this.title && location === null) {
        this.message = 'Showing result(s) for' + ' ' + this.title;
      } else if (this.title && this.location) {
        this.message = 'Showing result(s) for' + ' ' + this.title + ' ' + 'in' + ' ' + this.location;
      }

      this.isShowDetails = true;
      this.SearchResult = this.initialResult;
      this.totalItems = this.initialItem;
      // this.searchResultLength = this.initialLength;
    }
  }

  myOnChange(value: any) {
    this.ngProgress.start();
    this.Price_min = value.from;
    this.Price_max = value.to;

    const dataTwo = {
      category_id: this.selectedIds.toString(),
      service_date: '',
      price_min: this.Price_min,
      price_max: this.Price_max,
      sort: "2",
      page: "1",
      off_days: this.date_value ? this.date_value : ""
    };
    this.http.serviceFilter(dataTwo).then((success: any) => {
      console.log('price change success :', success);
      if (success.ack === 1) {
        this.ngProgress.done();
        this.isShowDetails = true;
        this.minPrice = success.min_price;
        this.maxPrice = success.max_price;
        this.SearchResult = success.result;
        console.log('Search Result :', this.SearchResult);
        this.totalItems = parseInt(success.total_rows, 10);
        // this.searchResultLength = success.result.length;
      } else if (success.ack === 0) {
        this.ngProgress.done();
        this.isShowDetails = false;
        console.log('not change');
      }
    }).catch((error: any) => {
      this.ngProgress.done();
      console.log('error :', error);
    });
  }

  pageChanged(event: any): void {
    this.ngProgress.start();
    if (this.selectedIds.length > 0 && this.Price_max && this.Price_min) {
      this.isShowPrice = true;
      const dataTwo = {
        category_id: this.selectedIds.toString(),
        service_date: '',
        price_min: this.Price_min,
        price_max: this.Price_max,
        sort: "2",
        page: event.page,
        off_days: this.date_value ? this.date_value : ""
      };
      this.http.serviceFilter(dataTwo).then((success: any) => {
        console.log('success :', success);
        if (success.ack === 1) {
          this.ngProgress.done();
          window.scrollTo(0, 0);
          this.minPrice = success.min_price;
          this.maxPrice = success.max_price;
          this.SearchResult = success.result;
          console.log('SearchResult :', this.SearchResult);
          this.totalItems = parseInt(success.total_rows, 10);
          // this.searchResultLength = success.result.length;
        } else if (success.ack === 0) {
          this.ngProgress.done();
          console.log('error');
        }
      }).catch((error: any) => {
        this.ngProgress.done();
        console.log('error :', error);
      });
    }
    if (this.selectedIds.length > 0) {
      this.isShowPrice = true;
      const dataOne = {
        category_id: this.selectedIds.toString(),
        service_date: '',
        price_min: '',
        price_max: '',
        sort: "1",
        page: event.page,
        off_days: this.date_value ? this.date_value : ""
      };
      this.http.serviceFilter(dataOne).then((success: any) => {
        console.log('success is :', success);
        if (success.ack === 1) {
          this.ngProgress.done();
          window.scrollTo(0, 0);
          this.minPrice = success.min_price;
          this.maxPrice = success.max_price;
          this.SearchResult = success.result;
          this.totalItems = parseInt(success.total_rows, 10);
          // this.searchResultLength = success.result.length;
        } else if (success.ack === 0) {
          this.ngProgress.done();
          console.log("Not filtered");
        }
      }).catch((error: any) => {
        this.ngProgress.done();
        console.log('error :', error);
      });
    }
    if (this.selectedIds.length === 0) {
      this.isShowPrice = false;
    }
    const data = {
      keyword_type: this.keyword_type ? this.keyword_type : '',
      keyword_slug: this.keyword_slug ? this.keyword_slug : '',
      keyword: this.keyword ? this.keyword : '',
      latitude: this.lat ? this.lat : '',
      longitude: this.long ? this.long : '',
      page: event.page
    };

    this.http.search(data).then((success: any) => {
      console.log('success :', success);
      if (success.ack === 1) {
        this.ngProgress.done();
        window.scrollTo(0, 0);
        this.SearchResult = success.result;
      } else if (success.ack === 0) {
        this.ngProgress.done();
        console.log('not found');
      }
    }).catch((error: any) => {
      this.ngProgress.done();
      console.log('error :', error);
    });
  }

  // go company details page
  goCompDetailsPage(value) {
    console.log(value);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'company-name': value.slug,
        'offday': this.date_value ? this.date_value : 0
      }
    };
    this.router.navigate(['/details'], navigationExtras);
  }

  // clear data
  clearData() {
    $('input:checkbox').prop('checked', false);
    this.datePickup.controls['selected_date'].setValue(null);
    this.isShowDetails = true;
    this.isShowPrice = false;
    this.SearchResult = this.initialResult;
    this.totalItems = this.initialItem;
    // this.searchResultLength = this.initialLength;
  }
}