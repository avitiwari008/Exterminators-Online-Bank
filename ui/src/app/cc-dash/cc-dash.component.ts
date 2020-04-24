import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/reducers/login.reducer';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cc-dash',
  templateUrl: './cc-dash.component.html',
  styleUrls: ['./cc-dash.component.scss']
})
export class CcDashComponent implements OnInit {
  user: User;
  users: User[];
  dataSource;
  displayedColumns: string[] = ['name', 'email', 'phone', 'accountNum', 'role'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private store: Store<fromAuth.State>, 
    private router: Router,
    private service: UserService) { }

  ngOnInit(): void {
    let auth;
    this.store.subscribe(val => auth = val);
    if (auth.auth.status.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.user = auth.auth.status.user;
      this.service.getAllUser()
        .subscribe(users => {
          this.users = users;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
        }); 
      
    }
    
    

  }
}
