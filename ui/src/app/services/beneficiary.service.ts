import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap, endWith } from 'rxjs/operators';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';
import { Beneficiary } from '../model/beneficiary'
import { environment } from 'src/environments/environment';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//   })
// };
// in env fodler
const endpoint = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private http: HttpClient) { }


  // end point to get all items
  getbeneficiary(accountNumber: string): Observable<any> {

    return this.http.get(`${endpoint + 'beneficiaries'}/${accountNumber}`);
  }


  // end point to save all beneficiary
  savebeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {

    return this.http.post<Beneficiary>(endpoint + 'beneficiaries', beneficiary);
  }

  // end point to delete beneficiary
  deleteBeneficiary(accountNumber): Observable<Beneficiary> {

    return this.http.delete<Beneficiary>(`${endpoint + 'beneficiaries/add'}/${accountNumber}`);
  }

  // manage beneficiaries
  getAccountbyAccountNumber(accountNumber): Observable<any> {
    return this.http.get<any>(`${endpoint + 'accounts'}/${accountNumber}`);
  }

  getBeneficiarybyaccountNumber(accountNumber): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${endpoint + 'beneficiaries/add'}/${accountNumber}`);
  }

  // find if the user of Our Bank exists
  getUserByAccountNumber(accountNumber, parentAccountNumber): Observable<any> {
    return this.http.get(`${endpoint + 'beneficiaries'}/${accountNumber}/${parentAccountNumber}`);
  }
}
