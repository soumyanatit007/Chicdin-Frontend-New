import { Component, OnInit } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [UserHttpService]
})

export class BookingComponent implements OnInit {
  constructor(
    public http: UserHttpService,
    public router: Router) {

  }

  ngOnInit() {}
}
