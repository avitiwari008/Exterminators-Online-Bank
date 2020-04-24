import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { Transaction } from '../model/transaction.model';
import { FundstransferService } from '../services/fundstransfer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-donate-covid',
  templateUrl: './donate-covid.component.html',
  styleUrls: ['./donate-covid.component.scss']
})
export class DonateCovidComponent implements OnInit {
  donateFormGroup : FormGroup
  user: User;
  transaction: Transaction;
  constructor(private store: Store<fromAuth.State>, 
    private router: Router, public rest: FundstransferService
    , private _snackBar: MatSnackBar ) { 
      this.transaction = new Transaction();
    }

  ngOnInit(): void {
    let auth;
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user; 
    }
    this.donateFormGroup = new FormGroup({
      amountCtrl : new FormControl('', [
        Validators.required,
        Validators.min(0.1),
        Validators.pattern('^[0-9]\\d*(?:\\.\\d{1,2})?$'),
      ]),
    });
  }



  // pass the transaction model to FundstransferService for debiting the amount
  debit(transaction : Transaction): void{
    this.transaction.amount = Number(this.transaction.amount);
    this.transaction.ownerAccountNum =  this.user.account.AccountNumber;
    this.transaction.category = 'Donation';
    this.transaction.type = 'Debit';
    this.rest.debitAmount(transaction).subscribe((data) => {
      if(data instanceof Transaction){
        this.openSnackBar(transaction.ownerAccountNum + ` 
      has been debited successfully by USD ${transaction.amount}`
      , 'Dismiss');
      this.router.navigate(['/dashboard']);
      } else {
        const obj = JSON.parse(JSON.stringify(data));
        if(obj.status = 401){
          if(obj.message == "Account doesnt exist or Insufficient Funds"){
            this.openSnackBar('Insufficient funds, please try changing the amount to a lesser value'
      , 'Dismiss');
          }
          else{
            this.openSnackBar(obj.message, 'Dismiss');
          }
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  //Snack bar to show the successs/error message
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }
}


