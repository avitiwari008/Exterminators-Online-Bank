import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsdetailsService } from '../services/transactionsdetails.service';
import { Transaction } from '../model/transaction.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss']
})
export class ExpenseChartComponent implements OnInit {
  user: User;
  transactions: Transaction[];
  expensechart = [];
  title = 'app';
  public pieChartLabels: string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"];
  public pieChartData: number[] = [21, 39, 10, 14, 16];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {
    'backgroundColor': [
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",
      "#E7E9ED",
      "#36A2EB"
    ]
  }

  constructor(public rest: TransactionsdetailsService, private route: ActivatedRoute, private router: Router,
    private store: Store<fromAuth.State>) { }

  ngOnInit(): void {
    let auth;
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      this.getbeneficiary();
    }
  }

  getbeneficiary() {
    this.rest.getpdf(this.user.account.AccountNumber)
      .subscribe(data => {
        this.transactions = data;
        let credit = 0, transfer = 0, food = 0, shopping = 0, travel = 0, fuel = 0,
          donation = 0, emi = 0, utilityBills = 0, other = 0;
        for (let transaction of this.transactions) {
          //taking one transaction data at a time
          if (transaction.type == 'Credit') {
            credit += transaction.amount;
          } else {
            //Debit with different categories
            if (transaction.category == 'Food') {
              food += transaction.amount;
            } else if (transaction.category == 'Shopping') {
              shopping += transaction.amount;
            } else if (transaction.category == 'Travel') {
              travel += transaction.amount;
            } else if (transaction.category == 'Fuel') {
              fuel += transaction.amount;
            } else if (transaction.category == 'EMI') {
              emi += transaction.amount;
            } else if (transaction.category == 'Donation') {
              donation += transaction.amount;
            } else if (transaction.category == 'Utility Bills') {
              utilityBills += transaction.amount;
            } else if(transaction.category == 'TRANSFER'){
              transfer += transaction.amount;
            } else {
              other += transaction.amount;
            }
          }
        }

        let pieChartData = [food, shopping, travel, fuel, emi, donation, utilityBills, transfer, other];
        this.developPieChart(pieChartData);
      });
  }

  developPieChart(chartData) {
    this.expensechart = new Chart('canvasexpense', {
      type: 'pie',
      data: {
        labels: ['Food', 'Shopping', 'Travel', 'Fuel', 'EMI', 'Donation', 'Utility Bills', 'Transfer','Other'],
        datasets: [{
          label: 'With Respect to USD',
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 71, 0.2)',
            'rgba(50, 205, 50, 0.2)',
            'rgba(210, 105, 30, 0.2)',
            'rgba(220, 220, 220, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 71, 1)',
            'rgba(50, 205, 50, 1)',
            'rgba(210, 105, 30, 1)',
            'rgba(220, 220, 220, 1)',
          ],
          borderWidth: 1
        }]
      },

    })
  }





}
