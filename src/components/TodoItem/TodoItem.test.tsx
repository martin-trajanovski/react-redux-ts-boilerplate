import { fireEvent } from '@testing-library/react';
import React from 'react';

import { updateTodoSuccess, removeTodoSuccess } from '../../actions';
import {
  renderWithRedux,
  initialTestingAppState,
} from '../../config/setupTests';

import TodoItem from '.';

/**
 * TODO: Review the tests here. They are too big and complex.
 * Test just the presentational layer not the reducers, they are tested separately!
 */
describe('TodoItem component', () => {
  test('When rendering the component, should show it with red remove(trash) icon', () => {
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

  test('When clicking on todo text, should complete todo', () => {
    const [initialTodo] = initialTestingAppState.todos.items;
    const {
      container,
      store: { getState, dispatch },
    } = renderWithRedux(<TodoItem todo={initialTodo} />, {
      initialState: initialTestingAppState,
    });
    const todoItem = container.querySelector('.todo-item');

    expect(todoItem).not.toHaveClass('completed');

    const todoItemText = container.querySelector('.todo-item-text');

    fireEvent.click(todoItemText);
    dispatch(
      updateTodoSuccess({ ...initialTodo, completed: !initialTodo.completed })
    );

    const [initialTodoFromStore] = getState().todos.items;

    expect(initialTodoFromStore.completed).toBeTruthy();
  });

  test('When clicking on todo trash icon, should remove todo successfully', () => {
    const [initialTodo] = initialTestingAppState.todos.items;
    const {
      container,
      store: { getState, dispatch },
    } = renderWithRedux(<TodoItem todo={initialTodo} />, {
      initialState: initialTestingAppState,
    });
    const todoItemTrashIcon = container.querySelector('.fa-trash');

    fireEvent.click(todoItemTrashIcon);
    dispatch(removeTodoSuccess(initialTodo));

    const todosStateAfterRemove = getState().todos;
    expect(todosStateAfterRemove.items).not.toContain(initialTodo);
  });
});
