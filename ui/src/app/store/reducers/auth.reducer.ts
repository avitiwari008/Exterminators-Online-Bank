import { AuthActions, LogoutActions } from '../actions';
import { User } from './../../model/user';
import { createReducer, on } from '@ngrx/store';

export const statusFeatureKey = 'status';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.updateUser, (state, { user }) => ({ ...state, user })),
  on(LogoutActions.logout, () => initialState)
);

export const getUser = (state: State) => state.user;
export const getState = (state: State) => state;
