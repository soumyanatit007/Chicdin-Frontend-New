import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public services: any = JSON.parse(localStorage.getItem("services"));
  public total:number = 0;
  public customer:any;
  public booking_id :any;
  public methodselected :boolean = false;
  public detailsbooking : any;
  constructor(private route: ActivatedRoute,public http: UserHttpService,private toastr: ToastrService,public router: Router) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    console.log('services',this.services);
    if (localStorage.getItem('UserData')) {
      this.customer = JSON.parse(localStorage.getItem('UserData'));
    }
    this.booking_id = this.route.snapshot.paramMap.get('id');

    this.http.getBookings(this.booking_id).then((success_one: any) => {
      if(success_one.ack == 1){
        this.detailsbooking = success_one.result;
      }
    }).catch((error: any) => {
      console.log(error);
    });
    this.services.serviceData.forEach((success: any) => {
      const price = parseInt(success.price, 10);
      this.total= price + this.total;
    });
    localStorage.removeItem('services');
  }

}
