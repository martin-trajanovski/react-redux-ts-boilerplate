import { put, takeLatest, call } from 'redux-saga/effects';

import {
  fetchTodosSuccess,
  fetchTodosFailed,
  ReduxActionTypes,
  addTodoSuccess,
  addTodoFailed,
  updateTodoSuccess,
  updateTodoFailed,
  removeTodoSuccess,
  removeTodoFailed,
} from 'src/actions';
import {
  Todo,
  FetchTodosAction,
  AddTodoAction,
  UpdateTodoAction,
  RemoveTodoAction,
} from 'src/interfaces';
import { todoService } from 'src/services';

function* fetchTodosAsync(action: FetchTodosAction): Generator {
  try {
    const data = yield call(todoService.getAll, action.limitTo);

    yield put(fetchTodosSuccess(data as Todo[]));
  } catch (error) {
    yield put(fetchTodosFailed());
  }
}

function* addTodosAsync(action: AddTodoAction): Generator {
  try {
    const data = yield call(todoService.create, action.todo);

    yield put(addTodoSuccess(data as Todo));
  } catch (error) {
    yield put(addTodoFailed());
  }
}

function* updateTodosAsync(action: UpdateTodoAction): Generator {
  try {
    const data = yield call(todoService.update, action.todo);

    yield put(updateTodoSuccess(data as Todo));
  } catch (error) {
    yield put(updateTodoFailed());
  }
}

function* removeTodosAsync(action: RemoveTodoAction): Generator {
  try {
    const data = yield call(todoService.remove, action.id);

    yield put(removeTodoSuccess(data as Todo));
  } catch (error) {
    yield put(removeTodoFailed());
  }
}

export function* todoSaga(): Generator {
  yield takeLatest(ReduxActionTypes.FETCH_TODOS_STARTED, fetchTodosAsync);
  yield takeLatest(ReduxActionTypes.ADD_TODO_STARTED, addTodosAsync);
  yield takeLatest(ReduxActionTypes.UPDATE_TODO_STARTED, updateTodosAsync);
  yield takeLatest(ReduxActionTypes.REMOVE_TODO_STARTED, removeTodosAsync);
}
