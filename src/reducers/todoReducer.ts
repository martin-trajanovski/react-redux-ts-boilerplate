import { ID } from '../helpers/idGenerator';
import { Todo, TodosReducerActions, TodoState } from 'src/interfaces';
import { ReduxActionTypes } from 'src/actions';

export const initialState: TodoState = {
  items: [],
  loading: false,
  error: false,
};

export const todoReducer = (
  state = initialState,
  action: TodosReducerActions
): TodoState => {
  switch (action.type) {
    case ReduxActionTypes.FETCH_TODOS_STARTED: {
      // TODO: Should introduce loading param.
      return { ...state, loading: true };
    }
    case ReduxActionTypes.FETCH_TODOS_SUCCESS: {
      // TODO: Should introduce loading param.
      return {
        ...state,
        items: action.data,
        loading: false,
      };
    }
    case ReduxActionTypes.FETCH_TODOS_FAILED: {
      // TODO: Should introduce loading param.
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case ReduxActionTypes.ADD_TODO: {
      const newTodo = {
        id: ID(),
        title: action.todo.title,
        completed: false,
      };

      return { ...state, items: [...state.items, newTodo] };
    }
    case ReduxActionTypes.REMOVE_TODO: {
      const removeIndex = state.items.findIndex(
        (todo: Todo) => todo.id === action.id
      );

      const newTodos = [...state.items];
      newTodos.splice(removeIndex, 1);

      return {
        ...state,
        items: newTodos,
      };
    }

    case ReduxActionTypes.TOGGLE_TODO: {
      const toggleIndex = state.items.findIndex(
        (todo: Todo) => todo.id === action.id
      );

      const newTodos: Todo[] = [...state.items];
      newTodos[toggleIndex].completed = !newTodos[toggleIndex].completed;

      return {
        ...state,
        items: newTodos,
      };
    }
    default:
      return state;
  }
};
