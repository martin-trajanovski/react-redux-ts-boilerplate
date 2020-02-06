import { wait } from '@testing-library/react';
import React from 'react';

import * as todoActions from '../../actions/todoActions';
import { renderWithRedux } from '../../config/setupTests';

import TodoList from '.';

describe('TodoList component', () => {
  test('When rendering the component, `fetchTodo` action should be called only once', () => {
    renderWithRedux(<TodoList />);
    const fetchTodosSpy = jest.spyOn(todoActions, 'fetchTodos');
    const limitTo = 10;

    wait(() => {
      expect(fetchTodosSpy).toBeCalledTimes(1);
      expect(fetchTodosSpy).toBeCalledWith(limitTo);
    });
  });

  test(`When rendering the component, should render todos correctly`, () => {
    const { getAllByTestId } = renderWithRedux(<TodoList />);

    const todoList = getAllByTestId('todo-item');

    expect(todoList.length).toBe(1);
  });

  test('When rendering the component, should match the snapshot', () => {
    const { asFragment } = renderWithRedux(<TodoList />);

    expect(asFragment()).toMatchSnapshot();
  });
});
