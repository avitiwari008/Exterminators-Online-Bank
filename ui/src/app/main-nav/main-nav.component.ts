import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/reducers';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface LogOutdDialogData {
  header: string;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private service : LoginService, 
    private store: Store<fromAuth.State>, private router: Router, public dialog: MatDialog) {
      let loggedInUser;
      this.store.subscribe(val => loggedInUser = val);
      if (loggedInUser.auth.status.user == null) {
        this.router.navigate(['/login']);
      } else {
        this.user = loggedInUser.auth.status.user;
      }
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewLogout, {
      width: '500px',
      data: { header : `Are you sure you want to logout, ${this.user.firstName}?`}
    });
  }


  logout(){
    this.service.logout(this.user);
  }


}

@Component({
  selector: 'dialog-logout',
  templateUrl: 'dialog-logout.html',
  styleUrls: ['./dialog-logout.scss'],
})
export class DialogOverviewLogout {
  user : User;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewLogout>,
    @Inject(MAT_DIALOG_DATA) public data: LogOutdDialogData,
    private service : LoginService, private store: Store<fromAuth.State>,
    private router: Router,) {
      let loggedInUser;
      this.store.subscribe(val => loggedInUser = val);
      if (loggedInUser.auth.status.user == null) {
        this.router.navigate(['/login']);
      } else {
        this.user = loggedInUser.auth.status.user;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout(){
    this.dialogRef.close();
    this.service.logout(this.user);
  }

}

