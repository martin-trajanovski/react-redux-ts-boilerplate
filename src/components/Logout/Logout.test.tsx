import React from 'react';

import { renderWithRedux } from '../../config/setupTests';

import Logout from '.';

describe('Logout component', () => {
  test('When component is rendered, should contain `Logout` button with icon', () => {
    const { container, getByText, getByTestId } = renderWithRedux(<Logout />);

    const logoutButton = getByText('Logout');
    const logoutIcon = getByTestId('logout-icon');

    expect(container).toContainElement(logoutButton);
    expect(logoutButton).toContainElement(logoutIcon);
  });
});
