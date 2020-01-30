import { Todo } from './todoInterface';

export interface TodoState {
  items: Todo[];
  loading: boolean;
  saving: boolean;
  error: boolean;
}
