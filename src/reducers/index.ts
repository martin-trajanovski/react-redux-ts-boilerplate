import { combineReducers } from 'redux';
import { todoReducer } from './todoReducer';
import { TodoState } from 'src/interfaces';

export const rootReducer = combineReducers({
  todos: todoReducer,
});

export type AppState = { todos: TodoState };
