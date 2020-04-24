import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chart = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dailySensex();
  }

  // calling external api
  dailyForecast() {
    return this.http.get("https://api.worldtradingdata.com/api/v1/forex?base=USD&api_token=0FgweOVG4jo7B86AezKH3K4jfJYwCh8XDH0DBOp6wCR1ncTExWmxFhRWQGxJ")
      .pipe(map(result => result));
  }


  // method for displayingbar chart
  dailySensex() {
    this.dailyForecast()
      .subscribe(res => {
        let base = res['base'];
        console.log(base);
        let data = res['data'];
        console.log(data.AMD);
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: ['PKR', 'INR', 'CNY', 'AUD', 'CAD'],
            datasets: [{
              label: 'With Respect to USD',
              data: [data.PKR, data.INR, data.CNY, data.AUD, data.CAD],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
      });
  }

}
