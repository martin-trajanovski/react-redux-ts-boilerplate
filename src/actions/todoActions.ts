import {
  Todo,
  AddTodoAction,
  RemoveTodoAction,
  FetchTodosAction,
  FetchTodosSuccessAction,
  FetchTodosFailedAction,
  AddTodoSuccessAction,
  AddTodoFailedAction,
  UpdateTodoAction,
  UpdateTodoSuccessAction,
  UpdateTodoFailedAction,
  RemoveTodoSuccessAction,
  RemoveTodoFailedAction,
} from 'src/interfaces';

import { ReduxActionTypes } from '.';

export const addTodo = (todo: Todo): AddTodoAction => {
  return {
    type: ReduxActionTypes.ADD_TODO_STARTED,
    todo,
  };
};

export const addTodoSuccess = (todo: Todo): AddTodoSuccessAction => {
  return {
    type: ReduxActionTypes.ADD_TODO_SUCEESS,
    todo,
  };
};

export const addTodoFailed = (): AddTodoFailedAction => {
  return {
    type: ReduxActionTypes.ADD_TODO_FAILED,
  };
};

export const updateTodo = (todo: Todo): UpdateTodoAction => {
  return {
    type: ReduxActionTypes.UPDATE_TODO_STARTED,
    todo,
  };
};

export const updateTodoSuccess = (todo: Todo): UpdateTodoSuccessAction => {
  return {
    type: ReduxActionTypes.UPDATE_TODO_SUCCESS,
    todo,
  };
};

export const updateTodoFailed = (): UpdateTodoFailedAction => {
  return {
    type: ReduxActionTypes.UPDATE_TODO_FAILED,
  };
};

export const removeTodo = (id: string): RemoveTodoAction => {
  return {
    type: ReduxActionTypes.REMOVE_TODO_STARTED,
    id,
  };
};

export const removeTodoSuccess = (todo: Todo): RemoveTodoSuccessAction => {
  return {
    type: ReduxActionTypes.REMOVE_TODO_SUCCESS,
    todo,
  };
};

export const removeTodoFailed = (): RemoveTodoFailedAction => {
  return {
    type: ReduxActionTypes.REMOVE_TODO_FAILED,
  };
};

export const fetchTodos = (limitTo: number): FetchTodosAction => {
  return {
    type: ReduxActionTypes.FETCH_TODOS_STARTED,
    limitTo,
  };
};

export const fetchTodosSuccess = (data: Todo[]): FetchTodosSuccessAction => {
  return {
    type: ReduxActionTypes.FETCH_TODOS_SUCCESS,
    data,
  };
};

export const fetchTodosFailed = (): FetchTodosFailedAction => {
  return {
    type: ReduxActionTypes.FETCH_TODOS_FAILED,
  };
};
