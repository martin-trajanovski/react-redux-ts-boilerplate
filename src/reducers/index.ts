import { combineReducers } from 'redux';
import { TodoState } from 'src/interfaces';

import { todoReducer } from './todoReducer';

export const rootReducer = combineReducers({
  todos: todoReducer,
});

export type AppState = { todos: TodoState };
