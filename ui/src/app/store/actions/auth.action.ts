import { createAction, props, union } from '@ngrx/store';
import { User } from './../../model/user';

export const loginSuccess = createAction(
    '[Auth/API] Login Success',
    props<{ user: User }>()
  );

  export const updateUser = createAction(
    '[Auth/API] Update User',
    props<{ user: User }>()
  );
  
  export const loginFailure = createAction(
    '[Auth/API] Login Failure',
    props<{ error: any }>()
  );
  
  export const loginRedirect = createAction('[Auth/API] Login Redirect');
  
  // This is an alternative to union() type export. Work great when you need
  // to export only a single Action type.
  export type AuthActions = ReturnType<
    typeof loginSuccess | typeof loginFailure | typeof loginRedirect | typeof updateUser
  >;