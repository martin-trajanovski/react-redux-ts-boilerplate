import { ReduxActionTypes } from 'src/actions';
import { LoginFormData } from 'src/components/Login';

import { ReduxBaseAction } from '../reduxBaseActionInterface';
import { TokenDataInterface } from './auth.interface';

export interface LoginAction extends ReduxBaseAction {
  type: ReduxActionTypes.LOGIN_STARTED;
  data: LoginFormData;
}

export interface LoginSuccessAction extends ReduxBaseAction {
  type: ReduxActionTypes.LOGIN_SUCCESS;
  data: TokenDataInterface;
}

export interface LoginFailedAction extends ReduxBaseAction {
  type: ReduxActionTypes.LOGIN_FAILED;
}

export type AuthReducerActions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction;
