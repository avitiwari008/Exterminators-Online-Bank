import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TransactionsdetailsService {

  constructor(private http: HttpClient) { }



  // get 5 txns
  getTransactionbyaccountNumber(accountNumber): Observable<any> {
    return this.http.get(`${API_URL + 'transactions'}/${accountNumber}`);
  }

  // get all txns in pdf
  getpdf(accountNumber): Observable<any> {
    return this.http.get(`${API_URL + 'transactionspdf'}/${accountNumber}`);
  }

  // displays users account balance on frontedn
  getAccountBalance(accountNumber): Observable<any> {
    return this.http.get(`${API_URL + 'accounts'}/${accountNumber}`);
  }


}
