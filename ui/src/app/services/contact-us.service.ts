import { Injectable } from '@angular/core';
import { Contactus } from '../model/contactus.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  
  constructor(private http: HttpClient) { }

  saveComplaint(contactus : Contactus): Observable<any> {
    //Save the complaint raised by user 
    return this.http.post<Contactus>(endpoint + 'complaints', contactus);
  }

  getAllComplaints(): Observable<Contactus[]> {
    return this.http.get<Contactus[]>(endpoint + 'complaints');
  }
}
