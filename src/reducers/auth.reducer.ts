import { ReduxActionTypes } from 'src/actions';
import { AuthReducerActions } from 'src/interfaces';
import { UserState } from 'src/interfaces';
import { User } from 'src/interfaces';

export const initialState: UserState = {
  loggedInUser: {} as User,
  loading: false,
  error: false,
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
      return { ...state, loading: false };
    }
    case ReduxActionTypes.LOGIN_FAILED: {
      return { ...state, loading: false, error: true };
    }
    default:
      return state;
  }
};
