import React from 'react';

import { renderWithRedux } from '../../config/setupTests';

import NotFound from '.';

describe('NotFound component', () => {
  test('When component is rendered, should show the `Not found` text', () => {
    const { container } = renderWithRedux(<NotFound />);

    expect(container.innerHTML).toContain('Not found');
  });
});
