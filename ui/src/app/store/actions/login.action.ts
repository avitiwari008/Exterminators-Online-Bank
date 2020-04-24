import { createAction, props, union } from '@ngrx/store';
import { User } from './../../model/user';

export const login = createAction(
    '[Login Page] Login',
    props<{ users : User[] }>()
  );
  
  
  export type LoginPageActions = ReturnType<typeof login>;