import { Component, OnInit } from '@angular/core';
import { Contactus } from '../model/contactus.model';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ContactUsService } from 'src/app/services/contact-us.service';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactus : Contactus  = new Contactus();
  user: User
  contactUsFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private store: Store<fromAuth.State>, 
    private router: Router, private service : ContactUsService, private _snackBar: MatSnackBar) { }

  categories : Category[] = [
    {value: 'Account', viewValue: 'Account'},
    {value: 'Login', viewValue: 'Login'},
    {value: 'Beneficiary', viewValue: 'Beneficiary'},
    {value: 'Balance', viewValue: 'Balance'},
    {value: 'Dispute', viewValue: 'Dispute'},
    {value: 'Other', viewValue: 'Other'},
  ]

  ngOnInit(): void {
    let auth;
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
    }

    this.contactUsFormGroup = this._formBuilder.group({
      descriptionCtrl : ['', Validators.required],
      categoryCtrl : ['', Validators.required],
    });
  }

  saveComplaint() : void {
    //Call service and save the request into DB. Trigger mail as well
    this.contactus.description = this.contactUsFormGroup.get('descriptionCtrl').value;
    this.contactus.category = this.contactUsFormGroup.get('categoryCtrl').value;
    this.contactus.firstName = this.user.firstName;
    this.contactus.lastName = this.user.lastName;
    this.contactus.email = this.user.email;
    this.contactus.accountNumber = this.user.account.AccountNumber;

    console.log('Saving complaint');
    console.log(this.contactus);
    this.service.saveComplaint(this.contactus)
    .subscribe(data => {
      console.log('Complaint registered successfully');
    });
    this.openSnackBar('Complaint registered successfully.', 'Dismiss');
    this.router.navigate(['/dashboard', {}]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
