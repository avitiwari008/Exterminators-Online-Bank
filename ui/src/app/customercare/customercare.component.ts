import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { ContactUsService } from '../services/contact-us.service';
import { Contactus } from '../model/contactus.model';

@Component({
  selector: 'app-customercare',
  templateUrl: './customercare.component.html',
  styleUrls: ['./customercare.component.scss']
})
export class CustomercareComponent implements OnInit {
  user: User;
  complaints: Contactus[]
  panelOpenState = false;
  constructor(private store: Store<fromAuth.State>, private router: Router, 
    private rest: ContactUsService) { }

  ngOnInit(): void {
    let auth;
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      this.getbeneficiary();
      // this.mainNavModal.openModal();
    }
  }

    // get beneficiaries
  getbeneficiary() {
    this.rest.getAllComplaints()
      .subscribe(data => {
        this.complaints = data;
      })
    };

}
