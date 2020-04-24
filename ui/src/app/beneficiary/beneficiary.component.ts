import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Beneficiary } from '../model/beneficiary'
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiaryService } from '../services/beneficiary.service';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss']
})
export class BeneficiaryComponent implements OnInit {
  firstName: string;
  lastName: string;
  accountNumber: string;
  nickName: string;

  beneficiaries: any;
  panelOpenState = false;
  title = 'My Beneficiaries';
  benefeciary: Beneficiary;
  routingNumber: number;

  constructor(public rest: BeneficiaryService, private route: ActivatedRoute,
    private router: Router, private store: Store<fromAuth.State>, 
    private _snackBar: MatSnackBar) { }
  user: User;
  auth: any;
  ngOnInit(): void {
    this.initializeData();
    this.getbeneficiary();

  }

  // intitialized data for a loggedin User
  initializeData() {
    let auth;
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
    }
    console.log("beneficary" + this.user.account.AccountNumber);
  }

  // get beneficiaries
  getbeneficiary() {
    this.rest.getbeneficiary(this.user.account.AccountNumber)
      .subscribe(data => {
        this.beneficiaries = data;

      });
  }

  // function to delete beneficiaries
  deleteBeneficiary(benefeciary: Beneficiary) {
    // let benefeciary = new Beneficiary(this.firstName, this.lastName, this.accountNumber, this.nickName, this.routingNumber);

    this.rest.deleteBeneficiary(benefeciary.accountNumber).subscribe((data) => {
      this.openSnackBar(benefeciary.firstName + " has been deleted successfully"
      , 'Dismiss');
      this.getbeneficiary();
    }, (err) => {
      console.log(err);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }

}
