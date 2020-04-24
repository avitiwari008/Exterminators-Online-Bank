import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { User } from 'src/app/model/user';
import { Account } from 'src/app/model/account.model';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  //Form Groups to get user input
  personalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  credentialsFormGroup: FormGroup;
  ssnFormGroup: FormGroup;
  user: User;

   //variables to disable current and future dates in date picker
   minDate = new Date(1900, 0, 1);
   maxDate = new Date(new Date().setDate(new Date().getDate() - 1))

  constructor(private store: Store<fromAuth.State>, private _formBuilder: FormBuilder, 
    private service : UserService, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    //getting logged in user from Store
    let authState;
    this.store.subscribe(val => authState = val);
    //if user is ull navigate to login screen else continue
    if (authState.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = authState.auth.status.user;
      console.log(JSON.stringify(this.user));
    }
    
    //Validations on Personal Details Form
    this.personalFormGroup = this._formBuilder.group({
      //Form Controllers
      firstNameCtrl: [{disabled:true}, Validators.required],
      lastNameCtrl: ['', Validators.required],
      phoneNumCtrl: ['', [Validators.required, Validators.minLength, Validators.pattern("^[0-9]*$")]],
      emailIDCtrl: ['', [Validators.required, Validators.email]],
      dobCtrl: ['', [Validators.required]]
    });

    //Validations on address Details Form
    this.addressFormGroup = this._formBuilder.group({
      //Form Controllers
      addressLine1Ctrl: ['', Validators.required],
      addressLine2Ctrl: ['', Validators.required],
      cityCtrl: ['', [Validators.required,Validators.pattern("^[a-zA-Z]*$")]],
      stateCtrl: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      zipCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)]]
    });

    //Validations on Credentials Form
    this.credentialsFormGroup = this._formBuilder.group({
      //Form Controllers
      password: new FormControl('', [Validators.required,
      Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
    });

    //Validations on SSN Form
    this.ssnFormGroup = new FormGroup({
      //Form Controllers
      ssn: new FormControl({disabled:true}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      //accTypeCtrl : new FormControl(),
      accNumCtrl: new FormControl(),
      routingNumCtrl : new FormControl()
    })
    
    //Patched values of logged in user to profile
    this.personalFormGroup.patchValue({
      firstNameCtrl : this.user.firstName,
      lastNameCtrl : this.user.lastName,
      emailIDCtrl : this.user.email,
      phoneNumCtrl : this.user.phoneNumber,
      dobCtrl: this.user.dob
    });

    this.addressFormGroup.patchValue({
      addressLine1Ctrl: this.user.addressLine1,
      addressLine2Ctrl: this.user.addressLine2,
      cityCtrl: this.user.city,
      stateCtrl: this.user.state,
      zipCtrl: this.user.zip
    });

    this.credentialsFormGroup.patchValue({
      password: atob(this.user.password)
    });

    this.ssnFormGroup.patchValue({
      ssn: this.user.ssn,
      accNumCtrl: this.user.account.AccountNumber,
      routingNumCtrl : this.user.account.routingNumber,
      accTypeCtrl : this.user.accountType
    });
  }

  //to set visibility of SSN and Password
  hide = true;
  hideSSN = true;

  //Getting user data from profile if updated
  get passwordInput() { return this.credentialsFormGroup.get('password'); } 
  get ssnInput() { return this.ssnFormGroup.get('ssn'); } 

  account = new Account();

  updateUser(){
    this.user = new User();
    //Personal info
    //getting value of editatble field and setting to user input
    this.user.phoneNumber = this.personalFormGroup.get('phoneNumCtrl').value;
    this.user.dob = this.personalFormGroup.get('dobCtrl').value;

    //setting existing values to new object
    this.user.firstName = this.personalFormGroup.getRawValue().firstNameCtrl;
    this.user.lastName = this.personalFormGroup.getRawValue().lastNameCtrl;
    this.user.email = this.personalFormGroup.getRawValue().emailIDCtrl;

    //Address fields 
    //getting value of editatble field and setting to user input
    this.user.addressLine1 = this.addressFormGroup.get('addressLine1Ctrl').value;
    this.user.addressLine2 = this.addressFormGroup.get('addressLine2Ctrl').value;
    this.user.city = this.addressFormGroup.get('cityCtrl').value;
    this.user.state = this.addressFormGroup.get('stateCtrl').value;
    this.user.zip = this.addressFormGroup.get('zipCtrl').value;
    
    //Account Details
    //setting existing values to new object
    this.user.ssn = this.ssnFormGroup.getRawValue().ssn;
    this.account.AccountNumber = this.ssnFormGroup.getRawValue().accNumCtrl;
    this.account.routingNumber = this.ssnFormGroup.getRawValue().routingNumCtrl;
   // this.user.accountType =  this.ssnFormGroup.getRawValue().accTypeCtrl;
    this.user.account = this.account;

    // base64 encoded password
    this.user.password = btoa(this.credentialsFormGroup.get('password').value);

    //update user service call
    this.service.updateUser(this.user);
    this.router.navigate(['/dashboard']);
    this.openSnackBar('Profile Updated Successfully', 'Dismiss');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
