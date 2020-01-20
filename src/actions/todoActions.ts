import { ReduxActionTypes } from '.';
import {
  Todo,
  AddTodoAction,
  ToggleTodoAction,
  RemoveTodoAction,
  FetchTodosAction,
  FetchTodosSuccessAction,
  FetchTodosFailedAction,
} from 'src/interfaces';

export const addTodo = (todo: Todo): AddTodoAction => {
  return {
    type: ReduxActionTypes.ADD_TODO,
    todo,
  };
};

export const toggleTodo = (id: string): ToggleTodoAction => {
  return {
    type: ReduxActionTypes.TOGGLE_TODO,
    id,
  };
};

export const removeTodo = (id: string): RemoveTodoAction => {
  return {
    type: ReduxActionTypes.REMOVE_TODO,
    id,
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
