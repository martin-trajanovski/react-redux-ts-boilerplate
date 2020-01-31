import { fireEvent } from '@testing-library/react';
import React from 'react';

import * as todoActions from '../../actions/todoActions';
import {
  renderWithRedux,
  initialTestingAppState,
} from '../../config/setupTests';

import TodoItem from '.';

describe('TodoItem component', () => {
  test('When rendering the component, should show it with red remove(trash) icon on the right', () => {
    const [initialTodo] = initialTestingAppState.todos.items;
    const { container } = renderWithRedux(<TodoItem todo={initialTodo} />, {
      initialState: initialTestingAppState,
    });

    const todoItemText = container.querySelector('.todo-item-text');
    const todoItemTrashIcon = container.querySelector('.fa-trash');

    expect(todoItemText.innerHTML).toBe(initialTodo.title);
    expect(todoItemTrashIcon.nodeName).toBe('svg');
    expect(todoItemTrashIcon).toHaveClass('float-right');
    expect(todoItemTrashIcon).toHaveAttribute('color', '#dc3545');
  });

  test('When rendering the component with NOT `completed` todo, should show it without `completed` stylings', () => {
    const [initialTodo] = initialTestingAppState.todos.items;
    const { container } = renderWithRedux(<TodoItem todo={initialTodo} />, {
      initialState: initialTestingAppState,
    });

    const todoItem = container.querySelector('.todo-item');

    expect(todoItem).not.toHaveClass('completed');
  });

  /**
   * NOTE: Use of `jest.spyOn()` function to check if `updateTodo` gets called correctly. Jest makes life great again!
   */
  test('When clicking on todo text, `updateTodo` action should be called only once with initialTodo toggled', () => {
    const [initialTodo] = initialTestingAppState.todos.items;
    const { getByText } = renderWithRedux(<TodoItem todo={initialTodo} />, {
      initialState: initialTestingAppState,
    });
    const todoItemText = getByText(initialTodo.title);
    const updateTodoSpy = jest.spyOn(todoActions, 'updateTodo');

    fireEvent.click(todoItemText);

    expect(updateTodoSpy).toBeCalledTimes(1);
    expect(updateTodoSpy).toBeCalledWith({
      ...initialTodo,
      completed: !initialTodo.completed,
    });
  });

  test('When clicking on todo trash icon, `removeTodo` action should be called only once with initialTodo id', () => {
    const [initialTodo] = initialTestingAppState.todos.items;
    const { container } = renderWithRedux(<TodoItem todo={initialTodo} />, {
      initialState: initialTestingAppState,
    });
    const todoItemTrashIcon = container.querySelector('.fa-trash');
    const removeTodoSpy = jest.spyOn(todoActions, 'removeTodo');

    fireEvent.click(todoItemTrashIcon);

    expect(removeTodoSpy).toBeCalledTimes(1);
    expect(removeTodoSpy).toBeCalledWith(initialTodo._id);
  });
});
