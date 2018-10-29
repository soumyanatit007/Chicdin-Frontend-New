import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { allResolved } from 'q';
import { UserHttpService } from '../providers/user.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [UserHttpService]
})

export class CardComponent implements OnInit {
  constructor(
    public http: UserHttpService,
    public router: Router) {

  }

  ngOnInit() {}
}
