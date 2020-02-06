import { LoginFormData } from 'src/components/Login';
import { RegisterFormData } from 'src/components/Register';
import {
  LoginAction,
  LoginSuccessAction,
  LoginFailedAction,
  RegisterAction,
  RegisterSuccessAction,
  RegisterFailedAction,
  TokenDataInterface,
} from 'src/interfaces';

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

export const loginFailed = (error: string): LoginFailedAction => {
  return {
    type: ReduxActionTypes.LOGIN_FAILED,
    error,
  };
};

export const registerUser = (data: RegisterFormData): RegisterAction => {
  return {
    type: ReduxActionTypes.REGISTER_STARTED,
    data,
  };
};

export const registerUserSuccess = (data: any): RegisterSuccessAction => {
  return {
    type: ReduxActionTypes.REGISTER_SUCCESS,
    data,
  };
};

export const registerUserFailed = (error: string): RegisterFailedAction => {
  return {
    type: ReduxActionTypes.REGISTER_FAILED,
    error,
  };
};
