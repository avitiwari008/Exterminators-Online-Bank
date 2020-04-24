import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromAuth from './../../store/reducers/login.reducer';
import { Store, select } from '@ngrx/store';
import { User } from './../../model/user';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User();
  pending$ = this.store.pipe(select(fromAuth.getPending));
  error$ = this.store.pipe(select(fromAuth.getError));

  constructor(private loginApi: LoginService, private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.loginApi.loadUsers();
  }

  error; 
  errorMsg;
  onSubmit(user : User) {
    this.loginApi.login(user);
    this.store.subscribe(val => {
      this.error = val;
      this.errorMsg = this.error.auth.loginPage.error;
    });
  }

}
