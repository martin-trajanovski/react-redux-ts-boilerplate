import { Todo } from './todoInterface';

export interface TodoState {
  items: Todo[];
  loading: boolean;
  error: boolean;
}
