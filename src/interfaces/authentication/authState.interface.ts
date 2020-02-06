import { User } from '../user/user.interface';

export interface UserState {
  loggedInUser: User;
  loading: boolean;
  error: boolean;
}
