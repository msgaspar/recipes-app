import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../RenderWithRouter';
import LowerMenu from '../../components/LowerMenu';

describe('LowerMenu component', () => {
  it('should render correctly', () => {
    renderWithRouter(<LowerMenu />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
