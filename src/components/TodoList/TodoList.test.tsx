import React from 'react';

import { fetchTodosSuccess } from '../../actions';
import {
  renderWithRedux,
  initialTestingAppState,
} from '../../config/setupTests';

import TodoList from '.';

describe('TodoList component', () => {
  test(`When rendering the component,
    should display "Loading..." text initially and after dispatching "fetchTodoSuccess" should render todos correctly`, () => {
    const { container, store, getByText } = renderWithRedux(<TodoList />);

    // NOTE: Expect to show loading at the first render.
    expect(getByText('Loading...')).toBeInTheDocument();

    // NOTE: Should dispatch success manually because it is not called automatically.
    store.dispatch(fetchTodosSuccess(initialTestingAppState.todos.items));

    const todoList = container.querySelectorAll('.todo-item');
    expect(todoList.length).toBe(1);
  });

  test('When rendering the component, should match the snapshot', () => {
    const { asFragment, store } = renderWithRedux(<TodoList />);

    store.dispatch(fetchTodosSuccess(initialTestingAppState.todos.items));

    expect(asFragment()).toMatchSnapshot();
  });
});
