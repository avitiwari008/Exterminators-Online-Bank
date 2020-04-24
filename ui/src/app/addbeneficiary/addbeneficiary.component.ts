import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../services/beneficiary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiary } from '../model/beneficiary';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap, endWith } from 'rxjs/operators';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addbeneficiary',
  templateUrl: './addbeneficiary.component.html',
  styleUrls: ['./addbeneficiary.component.scss']
})
export class AddbeneficiaryComponent implements OnInit {
  // variables declared for using through out 
  firstName: string;
  lastName: string;
  accountNumber: string;
  nickName: string;
  routingNumber: any;
  routing: any;
  beneficiaries: any;
  panelOpenState = false;
  title = 'My Beneficiaries';
  benef: Beneficiary;
  routingNumberCheck: boolean = false;
  error: string;
  user: User;
  auth: any;
  UserAccountdetails: any;
  // form groups to bind form data
  addBeneficiaryFormGroup: FormGroup;

  constructor(public rest: BeneficiaryService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient,
    private store: Store<fromAuth.State>, private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {


    //Validations on Personal Details Form
    this.addBeneficiaryFormGroup = this._formBuilder.group({
      firstNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
      lastNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
      accNumberCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Z0-9]+"),
      Validators.minLength(9), Validators.maxLength(15)]),
      nickNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
      routingNumberCtrl: new FormControl('', [Validators.required,
      Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)])
    });

    this.initializeData();
    this.getbeneficiary();

  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  initializeData() {
    let auth;
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
    }
  }

  getInputValues() {
    this.firstName = this.addBeneficiaryFormGroup.get("firstNameCtrl").value;
    this.lastName = this.addBeneficiaryFormGroup.get("lastNameCtrl").value;
    this.nickName = this.addBeneficiaryFormGroup.get("nickNameCtrl").value;
    this.accountNumber = this.addBeneficiaryFormGroup.get("accNumberCtrl").value;
    this.routingNumber = this.addBeneficiaryFormGroup.get("routingNumberCtrl").value;
  }

  // function to check the routing number
  check() {
    this.getInputValues();
    const userRoutingValue = (<HTMLInputElement>document.getElementById("routingNumber")).value;
    // check if roouting number is of Exterminator bank
    if (userRoutingValue === "111222333") {
      this.routingNumberCheck = true;
    } else {
      this.routingNumberCheck = false;
      // calling external api for verifying routing number
      const endpoint = 'https://www.routingnumbers.info/api/name.json?rn=';
      this.routingNumber = this.routingNumber;
      this.http.get(`${endpoint + this.routingNumber}`)
        .subscribe(data => {
          this.routing = data;

          // status code filtered and then allowed user to register or add a beneficiary
          if (this.routing["code"] === 200) {
            this.routingNumberCheck = true;
          } else if (this.routing["code"] === 404 || this.routing["code"] === 400) {
            this.routingNumberCheck = false;
            this.error = "Incorrect Routing Number";
            this.openSnackBar("Incorrect Routing Number", 'Dismiss');
          } 
        });
    }
  }

  //Snack bar to show the successs/error message
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }

  // get beneficiaries from backend
  getbeneficiary() {
    this.rest.getbeneficiary(this.user.account.AccountNumber)
      .subscribe(data => {
        this.beneficiaries = data;
      });
  }


  // saving beneficiary to the database
  savebeneficiary() {
    this.getInputValues();
    if (this.user.account.AccountNumber === this.accountNumber) {
      this.error = "Cannot add yourself as beneficiary";
      this.openSnackBar("Cannot add yourself as beneficiary", 'Dismiss');
    } else if (this.user.account.routingNumber == this.routingNumber) {
      this.rest.getAccountbyAccountNumber(this.accountNumber)
        .subscribe(data => {
          this.routing = data;
          if (this.routing != null) {
            //Account exists in SafeBank
            //Check whether Beneficiary already exists
            this.rest.getUserByAccountNumber(this.accountNumber, this.user.account.AccountNumber)
              .subscribe(data => { 
                if (data && data.length != 0) {
                  // checking if the beneficary already exists
                  this.error = "Beneficiary already exists";
                  this.openSnackBar("Beneficiary already exists", 'Dismiss');
                  } else {
                    //Account exists but is not a beneficiary, so we can add
                    this.benef = new Beneficiary(this.firstName, this.lastName,
                      this.accountNumber, this.nickName, this.routingNumber, this.user.account.AccountNumber);
                    this.rest.savebeneficiary(this.benef)
                      .subscribe(data => {
                        this.beneficiaries = data;
                        this.openSnackBar(data.firstName + " has been added successfully", 'Dismiss');
                        this.router.navigate(['/beneficiaries']);
                      });
                  }
              });
          } else {
            this.openSnackBar("Account doesn't exist", 'Dismiss');
          }
        }, (err) => {
          this.openSnackBar(err.error.message, 'Dismiss');
        });
        
    } else {
      this.rest.getUserByAccountNumber(this.accountNumber, this.user.account.AccountNumber)
        .subscribe(data => {
          this.routing = data;
          // checking if the beneficary already exists

          if (this.routing && this.routing.length != 0) {
            this.error = "Beneficiary already exists";
            this.openSnackBar("Beneficiary already exists", 'Dismiss');
          } else {
            this.benef = new Beneficiary(this.firstName, this.lastName, this.accountNumber, this.nickName, this.routingNumber, this.user.account.AccountNumber);

            this.rest.savebeneficiary(this.benef)
              .subscribe(data => {
                this.beneficiaries = data;
                this.openSnackBar(data.firstName + " has been added successfully", 'Dismiss');
                this.router.navigate(['/beneficiaries']);
              });
          }
        });
    }
  }
}
