import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ReduxActionTypes,
  loginSuccess,
  loginFailed,
  registerUserSuccess,
  registerUserFailed,
} from 'src/actions';
import {
  LoginAction,
  TokenDataInterface,
  RegisterAction,
} from 'src/interfaces';
import { authService } from 'src/services';

function* loginAsync(action: LoginAction): Generator {
  try {
    const data = yield call(authService.login, action.data);

    yield put(loginSuccess(data as TokenDataInterface));
  } catch (error) {
    yield put(loginFailed(error));
  }
}

function* registerAsync(action: RegisterAction): Generator {
  try {
    const data = yield call(authService.register, action.data);

    yield put(registerUserSuccess(data));
  } catch (error) {
    yield put(registerUserFailed(error));
  }
}

export function* authSaga(): Generator {
  yield takeLatest(ReduxActionTypes.LOGIN_STARTED, loginAsync);
  yield takeLatest(ReduxActionTypes.REGISTER_STARTED, registerAsync);
}
