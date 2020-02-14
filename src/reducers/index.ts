import { combineReducers } from 'redux';

import { TodoState, UserState } from 'src/interfaces';

import { authReducer } from './auth.reducer';
import { todoReducer } from './todo.reducer';

export const rootReducer = combineReducers({
  todos: todoReducer,
  auth: authReducer,
});

export type AppState = { todos: TodoState; auth: UserState };
