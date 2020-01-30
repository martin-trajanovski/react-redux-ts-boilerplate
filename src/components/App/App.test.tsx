import React from 'react';

import { renderWithRedux } from '../../config/setupTests';

import App from '.';

describe('App component', () => {
  test('When app component rendered, should show title "lovely todo app"', () => {
    const { getByText } = renderWithRedux(<App />);

    const titleElement = getByText(/lovely todo app/i);

    expect(titleElement).toBeInTheDocument();
  });
});
