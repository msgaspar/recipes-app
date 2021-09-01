import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import Explore from '../pages/Explore';

describe('Explore page', () => {
  it('should render correctly', () => {
    renderWithRouter(<Explore />);
    const title = screen.getByText('Explorar');
    expect(title).toBeInTheDocument();

    const exploreFoodBtn = screen.getByTestId('explore-food');
    exploreFoodBtn.click();
    const exploreDrinksBtn = screen.getByTestId('explore-drinks');
    exploreDrinksBtn.click();
  });
});
