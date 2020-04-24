import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  LoginPageActions,
  AuthActions,
  LogoutActions,
} from './../actions';
import { User } from './../../model/user';
import { LoginService } from './../../services/login.service';
import { LogoutConfirmationDialogComponent } from './../../login/logout-confirmation-dialog/logout-confirmation-dialog.component';

@Injectable()
export class AuthEffects {

  // loadStore$ = createEffect(
  //   () => this.actions$.pipe(
  //   ofType('LoginPageActions.'),
  //   mergeMap(() => this.moviesService.getAll()
  //     .pipe(
  //       map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
  //       catchError(() => EMPTY)
  //     ))
  //   )
  // );

//   login$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(LoginPageActions.login)
//     // map(action => action.users)
//     // exhaustMap((auth: Credentials) =>
//     //   this.authService.login(auth).pipe(
//     //     map(user => AuthApiActions.loginSuccess({ user })),
//     //     catchError(error => of(AuthApiActions.loginFailure({ error })))
//     //   )
//     // )
//   )
// );

//   loginSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.loginSuccess),
//         tap(() => this.router.navigate(['/']))
//       ),
//     { dispatch: false }
//   );

//   loginRedirect$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.loginRedirect, LogoutActions.logout),
//         tap(authed => {
//           this.router.navigate(['/login']);
//         })
//       ),
//     { dispatch: false }
//   );

//   logoutConfirmation$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(LogoutActions.logoutConfirmation),
//       exhaustMap(() => {
//         const dialogRef = this.dialog.open<
//           LogoutConfirmationDialogComponent,
//           undefined,
//           boolean
//         >(LogoutConfirmationDialogComponent);

//         return dialogRef.afterClosed();
//       }),
//       map(
//         result =>
//           result
//             ? LogoutActions.logout()
//             : LogoutActions.logoutConfirmationDismiss()
//       )
//     )
//   );

// //   logoutIdleUser$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(UserActions.idleTimeout),
// //       map(() => AuthActions.logout())
// //     )
// //   );

//   constructor(
//     private actions$: Actions,
//     private loginService: LoginService,
//     private router: Router,
//     //private dialog: MatDialog
//   ) {}
}