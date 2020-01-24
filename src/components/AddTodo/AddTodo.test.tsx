import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRedux } from '../../config/setupTests';
import AddTodo from '.';

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

  test('When form is submitted with populated input, should create todo successfully', () => {
    const {
      container,
      getByPlaceholderText,
      store: { getState },
    } = renderWithRedux(<AddTodo />);
    const form = container.querySelector('form');
    const input = getByPlaceholderText('Add todo');
    const newTodoText = 'New test todo';

    fireEvent.change(input, { target: { value: newTodoText } });
    fireEvent.submit(form);

    const { items } = getState().todos;
    expect(items.length).toBe(2);
    expect(items[items.length - 1].title).toBe(newTodoText);
  });

  test('When "Add todo" button is clicked with populated input, should create todo successfully', () => {
    const {
      getByPlaceholderText,
      getByText,
      store: { getState },
    } = renderWithRedux(<AddTodo />);
    const input = getByPlaceholderText('Add todo');
    const button = getByText('Add todo');
    const newTodoText = 'New test todo';

    fireEvent.change(input, { target: { value: newTodoText } });
    fireEvent.click(button);

    const { items } = getState().todos;
    expect(items.length).toBe(2);
    expect(items[items.length - 1].title).toBe(newTodoText);
  });
});
