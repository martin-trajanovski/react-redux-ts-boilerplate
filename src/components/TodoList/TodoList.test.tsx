import React from 'react';
import TodoList from '.';
import {
  renderWithRedux,
  initialTestingAppState,
} from '../../config/setupTests';
import { fetchTodosSuccess } from '../../actions';

test('should display todos correctly', () => {
  const { container, store, getByText } = renderWithRedux(<TodoList />);

  // NOTE: Expect to show loading at the first render.
  expect(getByText('Loading...')).toBeInTheDocument();

  // NOTE: Should dispatch success manually because it is not called automatically.
  store.dispatch(fetchTodosSuccess(initialTestingAppState.todos.items));

  const todoList = container.querySelectorAll('.todo-item');

  expect(todoList.length).toBe(1);
});

test('should render todos correctly', () => {
  const { asFragment, store } = renderWithRedux(<TodoList />);

  store.dispatch(fetchTodosSuccess(initialTestingAppState.todos.items));

  expect(asFragment()).toMatchSnapshot();
});
