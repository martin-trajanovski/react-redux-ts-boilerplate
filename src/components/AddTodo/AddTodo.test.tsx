import { fireEvent } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { addTodoSuccess } from '../../actions';
import { renderWithRedux } from '../../config/setupTests';
import { Todo } from '../../interfaces';

import AddTodo from '.';

const fakeTodo: Todo = {
  _id: faker.random.uuid(),
  title: faker.random.words(),
  completed: false,
};

/**
 * TODO: Review tests in this file because they are too long and a bit complicated.
 * Either split them or reduce some logic.
 * Test just the presentational layer not the reducers, they are tested separately!
 */
describe('AddTodo component', () => {
  test('When trying to submit empty todo, should not be added into state and form should be invalid', () => {
    const {
      container,
      getByPlaceholderText,
      getByText,
      store: { getState },
    } = renderWithRedux(<AddTodo />);
    const form = container.querySelector('form');
    const button = getByText('Add todo');
    const input = getByPlaceholderText('Add todo');

    fireEvent.submit(form);
    fireEvent.click(button);

    expect(button).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('required');
    expect(form).toBeInvalid();
    const { items } = getState().todos;
    expect(items.length).toBe(1);
  });

  test('When form is submitted with populated input, should enter saving mode', () => {
    const {
      container,
      getByPlaceholderText,
      store: { dispatch, getState },
    } = renderWithRedux(<AddTodo />);
    const form = container.querySelector('form');
    const input = getByPlaceholderText('Add todo');

    fireEvent.change(input, { target: { value: fakeTodo.title } });
    fireEvent.submit(form);

    const { saving } = getState().todos;
    expect(saving).toBeTruthy();

    dispatch(addTodoSuccess(fakeTodo));
    const { items } = getState().todos;

    expect(items).toContain(fakeTodo);
  });

  test('When "Add todo" button is clicked with populated input, should create todo successfully', () => {
    const {
      getByPlaceholderText,
      getByText,
      store: { dispatch, getState },
    } = renderWithRedux(<AddTodo />);
    const input = getByPlaceholderText('Add todo');
    const button = getByText('Add todo');

    fireEvent.change(input, { target: { value: fakeTodo.title } });
    fireEvent.click(button);

    const { saving } = getState().todos;
    expect(saving).toBeTruthy();

    dispatch(addTodoSuccess(fakeTodo));
    const { items } = getState().todos;

    expect(items).toContain(fakeTodo);
  });
});
