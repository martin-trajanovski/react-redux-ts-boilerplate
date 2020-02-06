import { fireEvent, wait } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { act } from 'react-dom/test-utils';

import * as authActions from '../../actions/authActions';
import { renderWithRedux } from '../../config/setupTests';

import Login from '.';

describe('Login Component', () => {
  test('When rendering the component, it should show login form with email, password inputs and submit button', () => {
    const { getByTestId } = renderWithRedux(<Login />);

    const loginForm = getByTestId('login-form');
    const emailInput = getByTestId('login-email-input');
    const passwordInput = getByTestId('login-password-input');
    const loginButton = getByTestId('login-button');

    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toContainElement(emailInput);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(loginForm).toContainElement(passwordInput);
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(loginForm).toContainElement(loginButton);
    expect(loginButton).toHaveAttribute('type', 'submit');
  });

  test('When submitting the empty form, it should show required field errors', async () => {
    const { getByTestId, findByTestId } = renderWithRedux(<Login />);
    const loginButton = getByTestId('login-button');

    fireEvent.click(loginButton);
    const emailErrorsElement = await findByTestId('email-errors');
    const passwordErrorsElement = await findByTestId('password-errors');

    expect(emailErrorsElement).toBeInTheDocument();
    expect(passwordErrorsElement).toBeInTheDocument();
  });

  test('When submitting the form with invalid email, it should show invalid email error', async () => {
    const { getByTestId, findByTestId } = renderWithRedux(<Login />);
    const loginForm = getByTestId('login-form');
    const emailInput = getByTestId('login-email-input');

    act(() => {
      fireEvent.change(emailInput, { target: { value: faker.random.word() } });
      fireEvent.submit(loginForm);
    });
    const emailErrorsElement = await findByTestId('email-errors');

    expect(emailErrorsElement).toBeInTheDocument();
    expect(emailErrorsElement.innerHTML).toBe('Email is invalid');
  });

  test('When submitting the form with valid credentials, `login` action should be called once with the same credentials', () => {
    const { getByTestId } = renderWithRedux(<Login />);
    const loginForm = getByTestId('login-form');
    const emailInput = getByTestId('login-email-input');
    const passwordInput = getByTestId('login-password-input');
    const loginSpy = jest.spyOn(authActions, 'login');
    const fakeCredentials = {
      email: faker.internet.email(),
      password: faker.random.word(),
    };

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: fakeCredentials.email },
      });
      fireEvent.change(passwordInput, {
        target: { value: fakeCredentials.password },
      });
      fireEvent.submit(loginForm);
    });

    // NOTE: Must wait for expectations to pass because form validation is async. (https://react-hook-form.com/faqs#TestingReactHookForm)
    wait(() => {
      expect(loginSpy).toBeCalledTimes(1);
      expect(loginSpy).toBeCalledWith(fakeCredentials);
    });
  });
});
