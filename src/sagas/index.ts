import { all } from 'redux-saga/effects';

import { authSaga } from './auth.saga';
import { todoSaga } from './todo.saga';

export default function* rootSaga(): Generator {
  yield all([todoSaga(), authSaga()]);
}
