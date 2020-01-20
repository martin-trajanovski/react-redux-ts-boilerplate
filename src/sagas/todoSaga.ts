import { put, takeLatest, call } from 'redux-saga/effects';
import { todoService } from 'src/services';
import {
  fetchTodosSuccess,
  fetchTodosFailed,
  ReduxActionTypes,
} from 'src/actions';
import { Todo, FetchTodosAction } from 'src/interfaces';

function* fetchTodosAsync(action: FetchTodosAction): Generator {
  try {
    const data = yield call(todoService.getAll, action.limitTo);

    yield put(fetchTodosSuccess(data as Todo[]));
  } catch (error)  {
    yield put(fetchTodosFailed());
  }
}

export function* todoSaga(): Generator {
  yield takeLatest(ReduxActionTypes.FETCH_TODOS_STARTED, fetchTodosAsync);
}
