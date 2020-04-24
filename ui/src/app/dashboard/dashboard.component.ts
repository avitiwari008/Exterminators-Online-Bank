import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { TransactionsdetailsService } from '../services/transactionsdetails.service';
// import { MainNavComponent }  from '../main-nav/main-nav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  accountDetails: any;


  // @ViewChild(MainNavComponent) mainNavModal;
  constructor(private store: Store<fromAuth.State>, private router: Router, public rest: TransactionsdetailsService) { }


  ngOnInit(): void {
    let auth;
    
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
    }
    this.displayAccountBalance();
  }


  displayAccountBalance() {
    this.rest.getAccountBalance(this.user.account.AccountNumber)
      .subscribe(data => {
        this.accountDetails = data;
      });

  }

}
