import { LoginFormData } from 'src/components/Login';
import { TokenDataInterface } from 'src/interfaces/authentication/auth.interface';
import {
  LoginAction,
  LoginSuccessAction,
  LoginFailedAction,
} from 'src/interfaces/authentication/authActions.interface';

import { ReduxActionTypes } from './actionTypes';

export const login = (data: LoginFormData): LoginAction => {
  return {
    type: ReduxActionTypes.LOGIN_STARTED,
    data,
  };
};

export const loginSuccess = (data: TokenDataInterface): LoginSuccessAction => {
  return {
    type: ReduxActionTypes.LOGIN_SUCCESS,
    data,
  };
};

export const loginFailed = (): LoginFailedAction => {
  return {
    type: ReduxActionTypes.LOGIN_FAILED,
  };
};
