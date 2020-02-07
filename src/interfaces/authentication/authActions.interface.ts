import { ReduxActionTypes } from 'src/actions';
import { LoginFormData } from 'src/components/Login';
import { RegisterFormData } from 'src/components/Register';

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
  error: string;
}

export interface RegisterAction extends ReduxBaseAction {
  type: ReduxActionTypes.REGISTER_STARTED;
  data: RegisterFormData;
}

export interface RegisterSuccessAction extends ReduxBaseAction {
  type: ReduxActionTypes.REGISTER_SUCCESS;
}

export interface RegisterFailedAction extends ReduxBaseAction {
  type: ReduxActionTypes.REGISTER_FAILED;
  error: string;
}

export type AuthReducerActions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailedAction;
