import { put, takeLatest, call } from 'redux-saga/effects';
import { ReduxActionTypes, loginSuccess, loginFailed } from 'src/actions';
import { LoginAction, TokenDataInterface } from 'src/interfaces';
import { authService } from 'src/services';

function* loginAsync(action: LoginAction): Generator {
  try {
    const data = yield call(authService.login, action.data);

    yield put(loginSuccess(data as TokenDataInterface));
  } catch (error) {
    yield put(loginFailed());
  }
}

export function* authSaga(): Generator {
  yield takeLatest(ReduxActionTypes.LOGIN_STARTED, loginAsync);
}
