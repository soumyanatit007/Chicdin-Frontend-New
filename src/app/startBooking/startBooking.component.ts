import { Component, OnInit, ViewChild } from '@angular/core';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ToastrService } from 'ngx-toastr';
import * as moment from "moment";
import * as MomentTimezone from "moment-timezone";
import * as $ from 'jquery';

@Component({
  selector: 'app-startbooking',
  templateUrl: './startBooking.component.html',
  styleUrls: ['./startBooking.component.scss'],
  providers: [UserHttpService]
})

// tslint:disable-next-line:class-name
export class startBookingComponent implements OnInit {

  public calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  public date: any;
  public time: any;

  public timeZone: any;
  public offSetDifference: any;
  public localDate: any;
  public localTime: any;
  public current_gmdate: any;

  public weekday: any = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
  public hiddenDays: any = [];
  public newDate = new Date();

  public companyLocation: any;
  public companyName: any;
  public totalPrice: any = 0;
  public company_slug: any;
  public serviceIds: any;

  public serviceData: any = [];

  public vendor_location_id: any;
  public customer_user_id: any;
  public opening_time: any;
  public closing_time: any;
  public slotDuration: any = "00:15:00";
  public off_days_value: any = [];

  public bookedData: any = [];
  public currentDate = new Date();
  public calendarResult: any;
  public c_Date: any;
  public isSelectable = true;

  public booking_staff_fetch_result: any;
  public isProfessional = false;
  public staff_Details: any;
  public staff_user_id: any;

  public c_ClosingTime = "00:00:00";
  public staffName: any;
  public isShowDefaultName = true;
  public isShowStaffName = false;
  public isShowCalendar = true;
  public weekday_name: any;

  constructor(private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public http: UserHttpService,
    private toastr: ToastrService) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    console.log(this.currentDate);
    // this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log("timezone :", this.timeZone);

    // this.offSetDifference = MomentTimezone.tz(this.timeZone).utcOffset();
    // console.log("offSetDifference :", this.offSetDifference);

    let mon: any;
    let d: any;
    const year = this.currentDate.getFullYear();
    if (this.currentDate.getMonth() + 1 < 10) {
      mon = "0" + (this.currentDate.getMonth() + 1);
    } else if (this.currentDate.getMonth() + 1 >= 10) {
      mon = this.currentDate.getMonth() + 1;
    }
    if (this.currentDate.getDate() < 10) {
      d = "0" + this.currentDate.getDate();
    } else if (this.currentDate.getDate() >= 10) {
      d = this.currentDate.getDate();
    }
    this.c_Date = year + "-" + mon + "-" + d;

    if (localStorage.getItem('vendorLocation')) {
      // console.log(JSON.parse(localStorage.getItem('vendorLocation')));
      this.current_gmdate = JSON.parse(localStorage.getItem('vendorLocation')).current_gmdate;

      this.vendor_location_id = JSON.parse(localStorage.getItem('vendorLocation')).vendorDetails.id;
      const opening_time = JSON.parse(localStorage.getItem('vendorLocation')).vendorDetails.opening_time;
      const closing_time = JSON.parse(localStorage.getItem('vendorLocation')).vendorDetails.closing_time;

      const openingTime_withDate = this.current_gmdate + " " + opening_time;
      // console.log("openingTime_withDate :", openingTime_withDate);
      const closingTime_withDate = this.current_gmdate + " " + closing_time;
      // console.log("closingTime_withDate :", closingTime_withDate);

      // tslint:disable-next-line:max-line-length
      const c_OpeningDate = new Date(new Date(openingTime_withDate).getTime() - (new Date(openingTime_withDate).getTimezoneOffset() * 60000)).getDate();
      // console.log("company open date :", c_OpeningDate);
      // tslint:disable-next-line:max-line-length
      const c_ClosingDate = new Date(new Date(closingTime_withDate).getTime() - (new Date(closingTime_withDate).getTimezoneOffset() * 60000)).getDate();
      // console.log("company closing date :", c_ClosingDate);
      if ((this.currentDate).getDate() === c_OpeningDate && (this.currentDate).getDate() === c_ClosingDate) {
        // tslint:disable-next-line:max-line-length
        this.opening_time = new Date(new Date(openingTime_withDate).getTime() - (new Date(openingTime_withDate).getTimezoneOffset() * 60000)).getHours() + ":" + new Date(new Date(openingTime_withDate).getTime() - (new Date(openingTime_withDate).getTimezoneOffset() * 60000)).getMinutes() + ":" + new Date(new Date(openingTime_withDate).getTime() - (new Date(openingTime_withDate).getTimezoneOffset() * 60000)).getSeconds();
        // console.log("company opening time :", this.opening_time);
        // tslint:disable-next-line:max-line-length
        this.closing_time = new Date(new Date(closingTime_withDate).getTime() - (new Date(closingTime_withDate).getTimezoneOffset() * 60000)).getHours() + ":" + new Date(new Date(closingTime_withDate).getTime() - (new Date(closingTime_withDate).getTimezoneOffset() * 60000)).getMinutes() + ":" + new Date(new Date(closingTime_withDate).getTime() - (new Date(closingTime_withDate).getTimezoneOffset() * 60000)).getSeconds();
        // console.log("company closing time :", this.closing_time);
      }
      if ((this.currentDate).getDate() !== c_OpeningDate && (this.currentDate).getDate() === c_ClosingDate) {
        // tslint:disable-next-line:max-line-length
        this.opening_time = new Date(this.currentDate.setHours(1, 0, 0, 0)).getHours() + ":" + new Date(this.currentDate.setHours(0, 0, 0, 0)).getMinutes() + ":" + new Date(this.currentDate.setHours(0, 0, 0, 0)).getSeconds();
        // console.log("company opening time :", this.opening_time);
        // tslint:disable-next-line:max-line-length
        this.closing_time = new Date(new Date(closingTime_withDate).getTime() - (new Date(closingTime_withDate).getTimezoneOffset() * 60000)).getHours() + ":" + new Date(new Date(closingTime_withDate).getTime() - (new Date(closingTime_withDate).getTimezoneOffset() * 60000)).getMinutes() + ":" + new Date(new Date(closingTime_withDate).getTime() - (new Date(closingTime_withDate).getTimezoneOffset() * 60000)).getSeconds();
        // console.log("company closing time :", this.closing_time);
      }
      if ((this.currentDate).getDate() === c_OpeningDate && (this.currentDate).getDate() !== c_ClosingDate) {
        // tslint:disable-next-line:max-line-length
        this.opening_time = new Date(new Date(openingTime_withDate).getTime() - (new Date(openingTime_withDate).getTimezoneOffset() * 60000)).getHours() + ":" + new Date(new Date(openingTime_withDate).getTime() - (new Date(openingTime_withDate).getTimezoneOffset() * 60000)).getMinutes() + ":" + new Date(new Date(openingTime_withDate).getTime() - (new Date(openingTime_withDate).getTimezoneOffset() * 60000)).getSeconds();
        // console.log("company opening time :", this.opening_time);
        // tslint:disable-next-line:max-line-length
        this.closing_time = new Date(this.currentDate.setHours(23, 0, 0, 0)).getHours() + ":" + new Date(this.currentDate.setHours(0, 0, 0, 0)).getMinutes() + ":" + new Date(this.currentDate.setHours(0, 0, 0, 0)).getSeconds();
        // console.log("company closing time :", this.closing_time);
      }
      const off_days = JSON.parse(localStorage.getItem('vendorLocation')).vendorDetails.off_days;
      this.off_days_value = off_days.split(",");
    }

    // getting services
    if (localStorage.getItem("services")) {
      // console.log(JSON.parse(localStorage.getItem("services")));
      this.companyName = JSON.parse(localStorage.getItem("services")).companyName;
      this.companyLocation = JSON.parse(localStorage.getItem("services")).companyLocation;
      this.company_slug = JSON.parse(localStorage.getItem("services")).company_slug;
      this.serviceIds = JSON.parse(localStorage.getItem("services")).serviceIds;
      if (this.serviceIds.length === 1) {
        this.isProfessional = true;
        const data = {
          company_slug: this.company_slug,
          vendor_location_id: this.vendor_location_id,
          service_id: (this.serviceIds).toString()
        };
        this.http.allBookingStaffFetch(data).then((success: any) => {
          // console.log(success);
          if (success.ack === 0) {
            // console.log("no staff found");
            this.isProfessional = false;

          } else if (success.ack === 1) {
            this.isProfessional = true;
            this.booking_staff_fetch_result = success.result;
            // console.log(this.booking_staff_fetch_result);
          }
        }).catch((error: any) => {
          console.log(error);
        });
      } else if (this.serviceIds.length >= 2) {
        this.isProfessional = false;
      }
      if (JSON.parse(localStorage.getItem("services")).serviceData.length > 0) {
        JSON.parse(localStorage.getItem("services")).serviceData.forEach((success: any) => {
          this.serviceData.push(success);
          const price = parseInt(success.price, 10);
          this.totalPrice = price + this.totalPrice;
        });
      }
    }

    if (localStorage.getItem('UserData')) {
      this.customer_user_id = JSON.parse(localStorage.getItem('UserData')).id;
    }

    // all booking record fetch
    this.http.allBookingRecordFetch(this.company_slug).then((success: any) => {
      // console.log("success :", success);
      if (success.ack === 0) {
        // console.log("calendar time not specified.");
        this.isShowCalendar = false;
      } else if (success.ack === 1) {
        this.isShowCalendar = true;
        if (success.result.length > 0) {
          this.calendarResult = success.result;

          this.calendarResult.forEach((result) => {
            const event_date = result.event_date;
            if (this.c_Date === event_date) {
              const eventStartDate_WithTimeStart = event_date + " " + result.event_time_start;
              // console.log("eventStartDate_WithTimeStart :", eventStartDate_WithTimeStart);
              const eventStartDate_WithTimeEnd = event_date + " " + result.event_time_end;
              // console.log("eventStartDate_WithTimeEnd :", eventStartDate_WithTimeEnd);

              // tslint:disable-next-line:max-line-length
              const event_time_start = new Date(new Date(eventStartDate_WithTimeStart).getTime() - (new Date(eventStartDate_WithTimeStart).getTimezoneOffset() * 60000));
              // tslint:disable-next-line:max-line-length
              const event_time_end = new Date(new Date(eventStartDate_WithTimeEnd).getTime() - (new Date(eventStartDate_WithTimeEnd).getTimezoneOffset() * 60000));

              let dataOne: any = {
                title: "Booked",
                date: event_date,
                start: event_time_start,
                end: event_time_end,
                color: "light blue",
                textColor: "black"
              };
              this.bookedData.push(dataOne);
              // console.log(this.bookedData);
            }
          });
          this.calendarOptions = {
            editable: false,
            eventLimit: false,
            defaultView: 'agendaDay',
            allDaySlot: false,
            header: {
              left: '',
              center: 'title',
              right: 'prev,next'
            },
            slotLabelFormat: "HH:mm a",
            minTime: this.opening_time,
            maxTime: this.closing_time,
            validRange: {
              start: moment().subtract(1, 'day'),
              end: moment().add(1, 'years')
            },
            slotDuration: this.slotDuration,
            selectable: true,
            eventStartEditable: false,
            events: this.bookedData,
            timezone: "local"
          };
          this.bookedData = [];
        }
      }
    }).catch((error: any) => {
      console.log("error :", error);
    });
  }

  // staff details change value
  staffDetailsChangeValue(value: any) {
    this.staff_user_id = value;
    //localStorage.setItem('set_staff_user_id', JSON.stringify({ staff_user_id: this.staff_user_id}));
    this.booking_staff_fetch_result.map((staff) => {
      if (this.staff_user_id === staff.id) {
        this.isShowStaffName = true;
        this.isShowDefaultName = false;
        this.staffName = staff.name;
        // console.log("staffName :", this.staffName);
      }
    });
  }

  // next or previous button
  arrowClick(value: any) {
    if (value.buttonType === "next" || value.buttonType === "prev") {
      this.weekday_name = this.weekday[(value.data._d).getDay()];
      const previousDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 1)).getDate();
      if (this.off_days_value.includes(this.weekday_name) === true) {
        this.isSelectable = false;
      }
      if (this.off_days_value.includes(this.weekday_name) === false) {
        this.isSelectable = true;
      }
      if ((value.data._d).getDate() === previousDate) {
        this.isSelectable = false;
        console.log(this.isSelectable);
      }
      // if (this.currentDate === previousDate) {
      //   this.isSelectable = false;
      // }

      let mon: any;
      let d: any;
      const year = value.data._d.getFullYear();
      if (value.data._d.getMonth() + 1 < 10) {
        mon = "0" + (value.data._d.getMonth() + 1);
      } else if (value.data._d.getMonth() + 1 >= 10) {
        mon = value.data._d.getMonth() + 1;
      }
      if (value.data._d.getDate() < 10) {
        d = "0" + value.data._d.getDate();
      } else if (value.data._d.getDate() >= 10) {
        d = value.data._d.getDate();
      }
      this.c_Date = year + "-" + mon + "-" + d;
      this.calendarResult.forEach((result) => {
        // console.log(result);
        const event_date = result.event_date;
        // console.log(event_date);
        if (this.c_Date === event_date) {
          const eventStartDate_WithTimeStart = event_date + " " + result.event_time_start;
          const eventStartDate_WithTimeEnd = event_date + " " + result.event_time_end;

          // tslint:disable-next-line:max-line-length
          const event_time_start = new Date(new Date(eventStartDate_WithTimeStart).getTime() - (new Date(eventStartDate_WithTimeStart).getTimezoneOffset() * 60000));
          // tslint:disable-next-line:max-line-length
          const event_time_end = new Date(new Date(eventStartDate_WithTimeEnd).getTime() - (new Date(eventStartDate_WithTimeEnd).getTimezoneOffset() * 60000));

          let dataOne: any = {
            title: "Booked",
            date: event_date,
            start: event_time_start,
            end: event_time_end,
            color: "light blue",
            textColor: "black"
          };
          this.bookedData.push(dataOne);
          // console.log(this.bookedData);
        }
      });
      this.calendarOptions = {
        editable: false,
        eventLimit: false,
        defaultView: 'agendaDay',
        allDaySlot: false,
        header: {
          left: '',
          center: 'title',
          right: 'prev,next'
        },
        slotLabelFormat: "HH:mm a",
        minTime: this.opening_time,
        maxTime: this.closing_time,
        validRange: {
          start: moment().subtract(1, 'day'),
          end: moment().add(1, 'years')
        },
        slotDuration: this.slotDuration,
        selectable: true,
        eventStartEditable: false,
        timezone: "local",
        events: this.bookedData,
      };
      this.bookedData = [];
    }
  }

  /** select time*/
  select(value: any) {
    if (this.isSelectable === true) {
      // getting date from select date
      const date = value.detail.start._d;

      // convert selected date into gmt date
      const selected_Date_To_Gmt = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
      // console.log("selected_Date_To_Gmt :", selected_Date_To_Gmt);

      const year = selected_Date_To_Gmt.getFullYear();
      const month = selected_Date_To_Gmt.getMonth() + 1;
      const day = selected_Date_To_Gmt.getDate();
      this.date = year + "/" + month + "/" + day;
      // console.log(this.date);

      const hour = selected_Date_To_Gmt.getHours();
      const minute = selected_Date_To_Gmt.getMinutes();
      this.time = hour + ":" + minute;
      // console.log(this.time);

      if (this.date && this.time) {
        // store date and time in gmt format
        localStorage.setItem('date_time', JSON.stringify({ date: this.date, time: this.time }));
        // console.log(JSON.parse(localStorage.getItem('date_time')));
      }

      if (!localStorage.getItem('UserData')) {
        localStorage.setItem('is_Login', JSON.stringify({
          "isLogin": false
        }));
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/pay-and-book',this.staff_user_id ? this.staff_user_id : ""]);
      }
      // booking
      /*const dataThree = {
        customer_user_id: this.customer_user_id,
        company_slug: this.company_slug,
        vendor_location_id: this.vendor_location_id,
        service_id: (this.serviceIds).toString(),
        staff_user_id: this.staff_user_id ? this.staff_user_id : "",
        event_date: this.date,
        event_time_start: this.time
      };
      this.http.newBookingAdd(dataThree).then((success_one: any) => {
        console.log("booking success response :", success_one);
        if (success_one.ack === 1) {
          console.log("booked");
          //this.router.navigate(['/pay-and-book']);
        } else if (success_one.ack === 0) {
          this.toastr.error(success_one.msg, 'Error', {
            timeOut: 2000
          });
        }
      }).catch((error: any) => {
        console.log(error);
      });*/
    } else if (this.isSelectable === false && this.off_days_value.includes(this.weekday_name) === true) {
      this.toastr.error("Company is closed.", 'Error', {
        timeOut: 2000
      });
    }
  }
}

