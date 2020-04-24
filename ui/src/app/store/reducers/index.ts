import { createSelector, createFeatureSelector, Action, combineReducers} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
    [fromLoginPage.loginPageFeatureKey]: fromLoginPage.loginReducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  state => state.status
);
export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);
export const selectLoggedIn = createSelector(selectUser, user => !!user);

export const selectLoginPageState = createSelector(
  selectAuthState,
  state => state.loginPage
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
