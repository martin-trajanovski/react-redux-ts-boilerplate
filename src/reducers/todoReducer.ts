import { ReduxActionTypes } from 'src/actions';
import { Todo, TodosReducerActions, TodoState } from 'src/interfaces';

export const initialState: TodoState = {
  items: [],
  loading: false,
  saving: false,
  error: false,
};

export const todoReducer = (
  state = initialState,
  action: TodosReducerActions
): TodoState => {
  switch (action.type) {
    case ReduxActionTypes.FETCH_TODOS_STARTED: {
      return { ...state, loading: true };
    }
    case ReduxActionTypes.FETCH_TODOS_SUCCESS: {
      return { ...state, items: action.data, loading: false };
    }
    case ReduxActionTypes.FETCH_TODOS_FAILED: {
      return { ...state, loading: false, error: true };
    }
    case ReduxActionTypes.ADD_TODO_STARTED: {
      return { ...state, saving: true };
    }
    case ReduxActionTypes.ADD_TODO_SUCEESS: {
      return { ...state, saving: false, items: [...state.items, action.todo] };
    }
    case ReduxActionTypes.ADD_TODO_FAILED: {
      return { ...state, saving: false, error: true };
    }
    case ReduxActionTypes.UPDATE_TODO_STARTED: {
      return { ...state, saving: true };
    }
    case ReduxActionTypes.UPDATE_TODO_SUCCESS: {
      const updatedTodos = state.items.map(todo => {
        if (todo._id === action.todo._id) {
          return {
            ...todo,
            ...action.todo,
          };
        }

        return todo;
      });

      return { ...state, saving: false, items: updatedTodos };
    }
    case ReduxActionTypes.UPDATE_TODO_FAILED: {
      return { ...state, saving: false, error: true };
    }
    case ReduxActionTypes.REMOVE_TODO_STARTED: {
      return { ...state, saving: true };
    }
    case ReduxActionTypes.REMOVE_TODO_SUCCESS: {
      const removeIndex = state.items.findIndex(
        (todo: Todo) => todo._id === action.todo._id
      );

      const newTodos = [...state.items];
      newTodos.splice(removeIndex, 1);

      return {
        ...state,
        saving: false,
        items: newTodos,
      };
    }
    case ReduxActionTypes.REMOVE_TODO_FAILED: {
      return { ...state, saving: false, error: true };
    }
    default:
      return state;
  }
};
