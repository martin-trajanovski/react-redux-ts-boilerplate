import { all } from 'redux-saga/effects';

import { todoSaga } from './todoSaga';

export default function* rootSaga(): Generator {
  yield all([todoSaga()]);
}
