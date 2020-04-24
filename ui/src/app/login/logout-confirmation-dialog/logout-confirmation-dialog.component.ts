import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from './../../store/reducers/login.reducer';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrls: ['./logout-confirmation-dialog.component.scss']
})
export class LogoutConfirmationDialogComponent implements OnInit {

  user: User;
  constructor(private router: Router, private store: Store<fromAuth.State>,
    private service : LoginService) { }

  ngOnInit(): void {
    let loggedInUser;
    this.store.subscribe(val => loggedInUser = val);
    if (loggedInUser.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = loggedInUser.auth.status.user;
    }
  }

  logout(){
    this.service.logout(this.user);
  }
}
