import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('NotFound page', () => {
  it('should render correctly', () => {
    render(<NotFound />);
    const message = screen.getByText('Page Not Found!');
    expect(message).toBeInTheDocument();
  });
});
