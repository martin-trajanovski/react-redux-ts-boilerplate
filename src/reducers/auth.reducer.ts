import { ReduxActionTypes } from 'src/actions';
import { AuthReducerActions } from 'src/interfaces';
import { UserState } from 'src/interfaces';
import { User } from 'src/interfaces';

export const initialState: UserState = {
  loggedInUser: {} as User,
  loading: false,
  error: '',
};

export const authReducer = (
  state = initialState,
  action: AuthReducerActions
): UserState => {
  switch (action.type) {
    case ReduxActionTypes.LOGIN_STARTED: {
      return { ...state, loading: true };
    }
    case ReduxActionTypes.LOGIN_SUCCESS: {
      return { ...state, loading: false, error: '' };
    }
    case ReduxActionTypes.LOGIN_FAILED: {
      return { ...state, loading: false, error: action.error };
    }
    case ReduxActionTypes.REGISTER_STARTED: {
      return { ...state, loading: true };
    }
    case ReduxActionTypes.REGISTER_SUCCESS: {
      return { ...state, loading: false, error: '' };
    }
    case ReduxActionTypes.REGISTER_FAILED: {
      return { ...state, loading: false, error: action.error };
    }
    default:
      return state;
  }
};
