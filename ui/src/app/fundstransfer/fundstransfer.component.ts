import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'jspdf-autotable';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import {FundstransferService} from '../services/fundstransfer.service';
import { BeneficiaryService } from '../services/beneficiary.service';
import { Transaction } from '../model/transaction.model';
import { Beneficiary } from '../model/beneficiary';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-fundstransfer',
  templateUrl: './fundstransfer.component.html',
  styleUrls: ['./fundstransfer.component.scss']
})
export class FundstransferComponent implements OnInit {
  title = 'Funds Transfer';
  transaction: Transaction;
  beneficiaries: any;
  interbank: Beneficiary[] = [];
  intrabank: Beneficiary[] = [];
  selectedBeneficiary: string;

  constructor(public restBeneficiary: BeneficiaryService, public rest: FundstransferService, private route: ActivatedRoute, 
    private router: Router, private store: Store<fromAuth.State>, private _snackBar: MatSnackBar ) {
    this.transaction = new Transaction();
  }
  user: User;
  auth: any;
  // displayText: string = undefined;
  panelOpenState = false;

  ngOnInit(): void {
    this.initializeTable();    
    this.getbeneficiary();
  }

  creditValidateForm = new FormGroup({
    amountFormControl : new FormControl('', [
      Validators.required,
      Validators.min(0.1),
      Validators.pattern('^[0-9]\\d*(?:\\.\\d{1,2})?$'),
    ]),
  });

  debitValidateForm = new FormGroup({
    amountFormControl : new FormControl('', [
      Validators.required,
      Validators.min(0.1),
      Validators.pattern('^[0-9]\\d*(?:\\.\\d{1,2})?$'),
    ]),
    categoryFormControl: new FormControl('', [
      Validators.required,
    ]),
  });

  beneficiaryValidateForm = new FormGroup({
    amountFormControl : new FormControl('', [
      Validators.required,
      Validators.min(0.1),
      Validators.pattern('^[0-9]\\d*(?:\\.\\d{1,2})?$'),
    ]),
    beneficiaryFormControl: new FormControl('', [
      Validators.required,
    ]),
  });

  initializeTable() {
    let auth;
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      this.transaction.ownerAccountNum =  this.user.account.AccountNumber;
    }
  }


  // pass the transaction model to FundstransferService for crediting the amount
  credit(transaction : Transaction): void{
    this.transaction.amount = Number(this.transaction.amount);
    this.transaction.category = "N.A.";
    this.transaction.type = "Credit";
    
    this.rest.creditAmount(transaction).subscribe((data) => {
      this.openSnackBar(transaction.ownerAccountNum + ` has been credited successfully by USD ${transaction.amount}`
      , 'Dismiss');
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }

  // pass the transaction model to FundstransferService for debiting the amount
  debit(transaction : Transaction): void{
    this.transaction.amount = Number(this.transaction.amount);
    this.transaction.type = "Debit";

    this.rest.debitAmount(transaction).subscribe((data) => {
      if(data instanceof Transaction){
        this.openSnackBar(transaction.ownerAccountNum + ` has been debited successfully by USD ${transaction.amount}`
      , 'Dismiss');
      this.router.navigate(['/dashboard']);
      }else{
        const obj = JSON.parse(JSON.stringify(data));
        if(obj.status = 401){
          if(obj.message == "Account doesnt exist or Insufficient Funds"){
            this.openSnackBar("Insufficient funds, please try changing the amount to a lesser value"
            , 'Dismiss');
          }
          else{
            this.openSnackBar(obj.message
            , 'Dismiss');
            this.router.navigate(['/dashboard']);
           
          }
        }
      }  
    }, (err) => {
      console.log(err);
    });
  }


  // get beneficiaries 
  getbeneficiary() {
    this.restBeneficiary.getbeneficiary(this.user.account.AccountNumber)
      .subscribe(data => {
        this.beneficiaries = data;
        for(let beneficiary of this.beneficiaries){
          if(beneficiary.routingNumber===111222333){
            this.intrabank.push(beneficiary);
          } else {
            this.interbank.push(beneficiary);
          }
        }
      });
  }

    // transferring amount to account in the same bank 
    transferInSameBank(transaction : Transaction): void{
      this.transaction.category = "TRANSFER";
      this.transaction.amount = Number(this.transaction.amount);

      this.rest.transferAmountSameBank(transaction).subscribe((data) => {
        if(data instanceof Transaction){
          this.openSnackBar(`Amount transferred successfully!`
            , 'Dismiss');
          this.router.navigate(['/dashboard']);
        }else{
          const obj = JSON.parse(JSON.stringify(data));
          if(obj.status = 401){
            if(obj.message == "Account doesnt exist or Insufficient Funds"){
              this.openSnackBar("Insufficient funds, please try changing the amount to a lesser value",
             'Dismiss');
            }
            else{
              this.openSnackBar(obj.message, 'Dismiss'); 
              this.router.navigate(['/dashboard']);
            }
          }
        }  
        
      }, (err) => {
        console.log(err);
      });
    }

    // transferring amount to account in a different bank 
    transferInOtherBank(transaction : Transaction): void{
      this.transaction.category = "TRANSFER";
      this.transaction.amount = Number(this.transaction.amount);
      this.transaction.type = "Debit"; 
      this.rest.transferAmountOtherBank(transaction).subscribe((data) => {
        if(data instanceof Transaction){
          this.openSnackBar(`Amount transferred successfully!`,
             'Dismiss');
          this.router.navigate(['/dashboard']);
        }else{
          const obj = JSON.parse(JSON.stringify(data));
          if(obj.status = 401){
            if(obj.message == "Account doesnt exist or Insufficient Funds"){
              this.openSnackBar("Insufficient funds, please try changing the amount to a lesser value",
             'Dismiss');
            }else{
              this.openSnackBar(obj.message,
             'Dismiss');
             this.router.navigate(['/dashboard']);
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
