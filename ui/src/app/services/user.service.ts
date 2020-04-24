import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers';
import { Router } from '@angular/router';
import { AuthActions } from '../store/actions';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private store: Store<fromAuth.State>,
    private router: Router) { }

  getAllUser(): Observable<Array<User>> {
    return this.http.get<Array<User>>(API_URL + 'users');
  }

  getUserByEmail(email : string): Observable<User> {
    return this.http.get<User>(API_URL + 'users/' + email);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(API_URL + 'users/' + user.email, user);
  }

  updateUser(user: User): void {
    // console.log("inside update user");
    this.update(user).subscribe((userDetails:User) => {
      // console.log("user in update user: "+ JSON.stringify(user));
      this.store.dispatch(AuthActions.updateUser({user}));
    });
}
}
