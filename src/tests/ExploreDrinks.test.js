import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import ExploreDrinks from '../pages/ExploreDrinks';

describe('ExploreDrinks page', () => {
  it('should render correctly', () => {
    renderWithRouter(<ExploreDrinks />);
    const title = screen.getByText('Explorar Bebidas');
    expect(title).toBeInTheDocument();

    const exploreByIngBtn = screen.getByTestId('explore-by-ingredient');
    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    exploreByIngBtn.click();
    exploreSurpriseBtn.click();
  });
});
