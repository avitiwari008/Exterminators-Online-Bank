import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers';
import { LoginPageActions, AuthActions, LogoutActions } from './../store/actions';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[];

  constructor(private http: HttpClient, 
    private store: Store<fromAuth.State>,
    private router: Router) { }

  getAllUser(): Observable<Array<User>> {
    return this.http.get<Array<User>>(API_URL + 'login');
  }

  setUsersToArray(): void {
    this.getAllUser().subscribe((users:User[]) => {
      this.users = users;
    })
  }

  getUserByEmail(email : string): Observable<User> {
    return this.http.get<User>(API_URL + 'login/' + email);
  }

  loadUsers(): void {
    this.setUsersToArray();
    this.loadStickiesIntoStore(this.users);
  }

  private loadStickiesIntoStore(users: Array<User>): void {
    this.store.dispatch(LoginPageActions.login({ users }));
  }

  login(user: User): void {
    this.loadUsers();
    this.setUsersToArray();
    const isauthentcated = this.authenticate(user);
    const error = "Email/password is incorrect. Please try again.";
    if (isauthentcated) {
      //Fetching entire user object
      this.getUserByEmail(user.email).subscribe((userDetails:User) => {
        user = userDetails;

        //dispatch login success state to store
        this.store.dispatch(AuthActions.loginSuccess({ user }));
        // console.log("this.store.getState(): "+ this.store.);
        
        // this.store.subscribe(function() {
        //   localStorage.setItem('state', JSON.stringify(this.store.getState()));
        // })      
        
        //how to use state in dashboard and other screens
        if(user.role != null && user.role === 'customercare'){
          this.router.navigate(['/ccdashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      })
    } else {
      //dispatch error state to store
      this.store.dispatch(AuthActions.loginFailure({ error }));
    }
  }

  authenticate(user: User): boolean {

    let isauthenticated = false;
    this.users.forEach(element => {
      //Decoding the base64 password returned
      if (user.email == element.email && user.password == atob(element.password)) {
        //Found the user. Marking him authenticated.
        isauthenticated = true;
        return isauthenticated;
      }
    });
    return isauthenticated;
  }

  updateLastLogin(email : string){
    this.http.put(API_URL + 'login/' + email + '/lastlogin', {})
    .subscribe((response: any) => {
    });
  } 

  logout(user: User): void {
    this.updateLastLogin(user.email)

    //check if updateLastLogin is successful
    this.store.dispatch(LogoutActions.logout());
    this.router.navigate(['/']);
  }
}



