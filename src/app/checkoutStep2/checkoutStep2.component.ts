import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { IonRangeSliderModule } from "ng2-ion-range-slider";



@Component({
  selector: 'app-categorySearch',
  templateUrl: './checkoutStep2.component.html',
  styleUrls: ['./checkoutStep2.component.scss'],
  providers: [UserHttpService]
})

export class checkoutStep2Component  implements OnInit {
  public services: any = JSON.parse(localStorage.getItem("services"));
  public total:number = 0;
  public customer_user_id:any;
  public staff_user_id :any;
  public methodselected :boolean = false;
  constructor(private route: ActivatedRoute,public http: UserHttpService,private toastr: ToastrService,public router: Router) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    if (localStorage.getItem('UserData')) {
      this.customer_user_id = JSON.parse(localStorage.getItem('UserData')).id;
    }
    this.staff_user_id = this.route.snapshot.paramMap.get('id');
    this.services.serviceData.forEach((success: any) => {
      const price = parseInt(success.price, 10);
      this.total= price + this.total;
    });
  }

  bookNow(){
    if(this.methodselected){
      //booking
      let test : any = JSON.parse(localStorage.getItem('vendorLocation'));
      const dataThree = {
        customer_user_id: this.customer_user_id,
        company_slug: this.services.company_slug,
        vendor_location_id: test.vendorDetails.id,
        service_id: (this.services.serviceIds).toString(),
        staff_user_id: this.staff_user_id ? this.staff_user_id : "",
        event_date: JSON.parse(localStorage.getItem("date_time")).date,
        event_time_start: JSON.parse(localStorage.getItem("date_time")).time,
        total_ammount: this.total
      };
      this.http.newBookingAdd(dataThree).then((success_one: any) => {
        console.log("booking success response :", success_one);
        if (success_one.ack === 1) {
          localStorage.removeItem('date_time');
          //localStorage.removeItem('services');
          localStorage.removeItem('vendorLocation');
          this.toastr.success('Booking Sucessfull!', 'Success', {
            timeOut: 5000
          });
          console.log("booked",success_one.result.id);
          //this.router.navigate(['/confirmation',success_one.result.id]);
          this.router.navigate(['/confirmation',success_one.result.id]);
        } else if (success_one.ack === 0) {
          this.toastr.error(success_one.msg, 'Error', {
            timeOut: 2000
          });
        }
      }).catch((error: any) => {
        console.log(error);
      });
    } else {
      this.toastr.error('Please select a payment method.', 'Error', {
        timeOut: 2000
      });
    }
  }

  selectmethod(type){
    if(type == '2'){
      this.methodselected = true;
    }
  }
}