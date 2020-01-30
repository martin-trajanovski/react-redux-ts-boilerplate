import { ReduxActionTypes } from 'src/actions';

import { ReduxBaseAction } from '../reduxBaseActionInterface';
import { Todo } from './todoInterface';

export interface AddTodoAction extends ReduxBaseAction {
  type: ReduxActionTypes.ADD_TODO_STARTED;
  todo: Todo;
}

export interface AddTodoSuccessAction extends ReduxBaseAction {
  type: ReduxActionTypes.ADD_TODO_SUCEESS;
  todo: Todo;
}

export interface AddTodoFailedAction extends ReduxBaseAction {
  type: ReduxActionTypes.ADD_TODO_FAILED;
}

export interface UpdateTodoAction extends ReduxBaseAction {
  type: ReduxActionTypes.UPDATE_TODO_STARTED;
  todo: Todo;
}

export interface UpdateTodoSuccessAction extends ReduxBaseAction {
  type: ReduxActionTypes.UPDATE_TODO_SUCCESS;
  todo: Todo;
}

export interface UpdateTodoFailedAction extends ReduxBaseAction {
  type: ReduxActionTypes.UPDATE_TODO_FAILED;
}

export interface RemoveTodoAction extends ReduxBaseAction {
  type: ReduxActionTypes.REMOVE_TODO_STARTED;
  id: string;
}

export interface RemoveTodoSuccessAction extends ReduxBaseAction {
  type: ReduxActionTypes.REMOVE_TODO_SUCCESS;
  todo: Todo;
}

export interface RemoveTodoFailedAction extends ReduxBaseAction {
  type: ReduxActionTypes.REMOVE_TODO_FAILED;
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
  | AddTodoSuccessAction
  | AddTodoFailedAction
  | UpdateTodoAction
  | UpdateTodoSuccessAction
  | UpdateTodoFailedAction
  | RemoveTodoAction
  | RemoveTodoSuccessAction
  | RemoveTodoFailedAction
  | FetchTodosAction
  | FetchTodosSuccessAction
  | FetchTodosFailedAction;
