import { fireEvent, act, wait } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import * as authActions from '../../actions/authActions';
import { renderWithRedux } from '../../config/setupTests';

import Register from '.';

describe('Register Component', () => {
  test('When rendering the component, it should show register form with email, first/lastName, password/confirmPassword inputs and submit button', () => {
    const { getByTestId } = renderWithRedux(<Register />);

    const registerForm = getByTestId('register-form');
    const emailInput = getByTestId('register-email-input');
    const firstNameInput = getByTestId('register-firstName-input');
    const lastNameInput = getByTestId('register-lastName-input');
    const passwordInput = getByTestId('register-password-input');
    const confirmPasswordInput = getByTestId('register-confirmPassword-input');
    const registerButton = getByTestId('register-button');

    expect(registerForm).toBeInTheDocument();
    expect(registerForm).toContainElement(emailInput);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(registerForm).toContainElement(firstNameInput);
    expect(firstNameInput).toHaveAttribute('type', 'text');
    expect(registerForm).toContainElement(lastNameInput);
    expect(lastNameInput).toHaveAttribute('type', 'text');
    expect(registerForm).toContainElement(passwordInput);
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(registerForm).toContainElement(confirmPasswordInput);
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    expect(registerForm).toContainElement(registerButton);
    expect(registerButton).toHaveAttribute('type', 'submit');
  });

  test('When submitting the empty form, it should show required field errors', async () => {
    const { getByTestId, findByTestId } = renderWithRedux(<Register />);
    const registerButton = getByTestId('register-button');

    fireEvent.click(registerButton);
    const emailErrorsElement = await findByTestId('email-errors');
    const firstNameErrorsElement = await findByTestId('firstName-errors');
    const lastNameErrorsElement = await findByTestId('lastName-errors');
    const passwordErrorsElement = await findByTestId('password-errors');
    const confirmPasswordErrorsElement = await findByTestId(
      'confirmPassword-errors'
    );

    expect(emailErrorsElement).toBeInTheDocument();
    expect(firstNameErrorsElement).toBeInTheDocument();
    expect(lastNameErrorsElement).toBeInTheDocument();
    expect(passwordErrorsElement).toBeInTheDocument();
    expect(confirmPasswordErrorsElement).toBeInTheDocument();
  });

  test('When submitting the form with invalid email, it should show invalid email error', async () => {
    const { getByTestId, findByTestId } = renderWithRedux(<Register />);
    const registerForm = getByTestId('register-form');
    const emailInput = getByTestId('register-email-input');

    act(() => {
      fireEvent.change(emailInput, { target: { value: faker.random.word() } });
      fireEvent.submit(registerForm);
    });
    const emailErrorsElement = await findByTestId('email-errors');

    expect(emailErrorsElement).toBeInTheDocument();
    expect(emailErrorsElement.innerHTML).toBe('Email is invalid');
  });

  test('When submitting the form with password different than confirm password, it should show `Passwords do not match` error', async () => {
    const { getByTestId, findByTestId } = renderWithRedux(<Register />);
    const registerForm = getByTestId('register-form');
    const passwordInput = getByTestId('register-password-input');
    const confirmPasswordInput = getByTestId('register-confirmPassword-input');

    act(() => {
      fireEvent.change(passwordInput, {
        target: { value: faker.random.word() },
      });
      fireEvent.change(confirmPasswordInput, {
        target: { value: faker.random.word() },
      });
      fireEvent.submit(registerForm);
    });
    const confirmPasswordErrorsElement = await findByTestId(
      'confirmPassword-errors'
    );

    expect(confirmPasswordErrorsElement).toBeInTheDocument();
    expect(confirmPasswordErrorsElement.innerHTML).toBe(
      'Passwords do not match'
    );
  });

  test('When submitting the form with valid fields, `registerUser` action should be called once with the same values', () => {
    const { getByTestId } = renderWithRedux(<Register />);
    const registerForm = getByTestId('register-form');
    const emailInput = getByTestId('register-email-input');
    const firstNameInput = getByTestId('register-firstName-input');
    const lastNameInput = getByTestId('register-lastName-input');
    const passwordInput = getByTestId('register-password-input');
    const confirmPasswordInput = getByTestId('register-confirmPassword-input');
    const registerSpy = jest.spyOn(authActions, 'registerUser');
    const fakeUser = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    };

    act(() => {
      fireEvent.change(emailInput, {
        target: { value: fakeUser.email },
      });
      fireEvent.change(firstNameInput, {
        target: { value: fakeUser.firstName },
      });
      fireEvent.change(lastNameInput, {
        target: { value: fakeUser.lastName },
      });
      fireEvent.change(passwordInput, {
        target: { value: fakeUser.password },
      });
      fireEvent.change(confirmPasswordInput, {
        target: { value: fakeUser.password },
      });
      fireEvent.submit(registerForm);
    });

    // NOTE: Must wait for expectations to pass because form validation is async. (https://react-hook-form.com/faqs#TestingReactHookForm)
    wait(() => {
      expect(registerSpy).toBeCalledTimes(1);
      expect(registerSpy).toBeCalledWith(fakeUser);
    });
  });
});
