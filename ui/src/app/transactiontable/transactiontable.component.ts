import { Component, OnInit } from '@angular/core';
import { TransactionsdetailsService } from '../services/transactionsdetails.service';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';

interface jsPDFWithPlugin extends jsPDF {

  autoTable: (options: UserOptions) => jsPDF;
}


@Component({
  selector: 'app-transactiontable',
  templateUrl: './transactiontable.component.html',
  styleUrls: ['./transactiontable.component.scss']
})
export class TransactiontableComponent implements OnInit {
  // accountNumber: 1234567890;
  transactions: any;
  constructor(public rest: TransactionsdetailsService, private route: ActivatedRoute, private router: Router, private store: Store<fromAuth.State>) { }
  user: User;
  auth: any;
  ngOnInit(): void {
    this.initializeTableTxn();
    this.getbeneficiary();

  }


  initializeTableTxn() {
    let self = this;
    this.store.subscribe(val => self.auth = val);
    this.user = this.auth.auth.status.user;
  }

  // get 5 txns
  getbeneficiary() {

    this.rest.getTransactionbyaccountNumber(this.user.account.AccountNumber)
      .subscribe(data => {
        this.transactions = data.map(b => {
          b.transactionDate = b.transactionDate.split("T")[0]
          return b;
        });


      });

  }

  // for generating pdf
  getpdf() {
    this.rest.getpdf(this.user.account.AccountNumber)
      .subscribe(
        data => this.pdfdata(data)

      );
  }

  // generating pdf format in tabular form
  pdfdata(pdf) {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.text(30, 20, "Exterminators");
    doc.autoTable({
      head: [['Account Number', 'Type', 'Category', 'Amount($)', 'Transaction Date']],
      body: pdf.map(transaction => {
        return [transaction["ownerAccountNum"], transaction["type"], transaction["category"], transaction["amount"], transaction["transactionDate"].split("T")[0]]
      })
    })

    doc.save("Transaction Details");
  }




}
