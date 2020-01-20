import { ReduxBaseAction } from '../reduxBaseActionInterface';
import { ReduxActionTypes } from 'src/actions';
import { Todo } from './todoInterface';

export interface AddTodoAction extends ReduxBaseAction {
  type: ReduxActionTypes.ADD_TODO;
  todo: Todo;
}

export interface ToggleTodoAction extends ReduxBaseAction {
  type: ReduxActionTypes.TOGGLE_TODO;
  id: string;
}

export interface RemoveTodoAction extends ReduxBaseAction {
  type: ReduxActionTypes.REMOVE_TODO;
  id: string;
}

export interface FetchTodosAction extends ReduxBaseAction {
  type: ReduxActionTypes.FETCH_TODOS_STARTED;
  limitTo: number;
}

export interface FetchTodosSuccessAction extends ReduxBaseAction {
  type: ReduxActionTypes.FETCH_TODOS_SUCCESS;
  data: Todo[];
}

export interface FetchTodosFailedAction extends ReduxBaseAction {
  type: ReduxActionTypes.FETCH_TODOS_FAILED;
}

export type TodosReducerActions =
  | AddTodoAction
  | ToggleTodoAction
  | RemoveTodoAction
  | FetchTodosAction
  | FetchTodosSuccessAction
  | FetchTodosFailedAction;
