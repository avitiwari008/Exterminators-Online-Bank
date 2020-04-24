import { LoginPageActions, AuthActions } from '../actions';
import { createReducer, on } from '@ngrx/store';

export const loginPageFeatureKey = 'loginPage';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export const loginReducer = createReducer(
  initialState,
  on(LoginPageActions.login, state => ({
    ...state,
    error: null,
    pending: true,
  })),
  on(AuthActions.loginSuccess, state => ({
    ...state,
    error: null,
    pending: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    pending: false,
  }))
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
