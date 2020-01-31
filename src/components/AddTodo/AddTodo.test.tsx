import { fireEvent } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import * as todoActions from '../../actions/todoActions';
import { renderWithRedux } from '../../config/setupTests';

import AddTodo from '.';

describe('AddTodo component', () => {
  const fakeTodoTitle = faker.random.words();

  test('When rendering the component, should display form with input and button', () => {
    const { container, getByPlaceholderText, getByText } = renderWithRedux(
      <AddTodo />
    );

    const form = container.querySelector('form');
    const input = getByPlaceholderText('Add todo');
    const button = getByText('Add todo');

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('When rendering the component, input should be required, button disabled and form should be invalid', () => {
    const { container, getByPlaceholderText, getByText } = renderWithRedux(
      <AddTodo />
    );
    const form = container.querySelector('form');
    const button = getByText('Add todo');
    const input = getByPlaceholderText('Add todo');

    expect(input).toBeRequired();
    expect(button).toBeDisabled();
    expect(form).toBeInvalid();
  });

  test('When form is submitted with populated input, input and button should be disabled', () => {
    const { container, getByPlaceholderText, getByText } = renderWithRedux(
      <AddTodo />
    );
    const form = container.querySelector('form');
    const input = getByPlaceholderText('Add todo');
    const button = getByText('Add todo');

    fireEvent.change(input, { target: { value: fakeTodoTitle } });
    fireEvent.submit(form);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  /**
   * NOTE: Use of `jest.spyOn()` function to check if `addTodo` gets called correctly. Jest makes life great again!
   */
  test('When `Add todo` button is clicked with populated input, `addTodo` action should be called only once with input text as title', () => {
    const { getByPlaceholderText, getByText } = renderWithRedux(<AddTodo />);
    const input = getByPlaceholderText('Add todo');
    const button = getByText('Add todo');
    const addTodoSpy = jest.spyOn(todoActions, 'addTodo');

    fireEvent.change(input, { target: { value: fakeTodoTitle } });
    fireEvent.click(button);

    expect(addTodoSpy).toBeCalledTimes(1);
    expect(addTodoSpy).toBeCalledWith({
      title: fakeTodoTitle,
      completed: false,
    });
  });
});
