import React from 'react';

import { renderWithRedux } from '../../config/setupTests';

import App from '.';

describe('App component', () => {
  test('When app component rendered, should show the main `App` wraper', () => {
    const { getByTestId } = renderWithRedux(<App />);

    const mainAppElement = getByTestId('App');

    expect(mainAppElement).toBeInTheDocument();
  });
});
