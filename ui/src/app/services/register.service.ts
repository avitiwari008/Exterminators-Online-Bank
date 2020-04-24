import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  users: User[];

  constructor(private http: HttpClient) { }

  // end point to get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'register');
  }

  // getUserArray(): User[] {
  //   this.getUsers().subscribe((users:User[]) => {
  //     this.users = users;
  //   })
  //   return this.users;
  // }

  registerUser(user: User): void {
    this.http.post(API_URL + 'register', user)
      .subscribe((response: any) => {
        this.users.push(user);
      });
  }

}
