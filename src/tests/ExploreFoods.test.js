import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import ExploreFoods from '../pages/ExploreFoods';

describe('ExploreFoods page', () => {
  it('should render correctly', () => {
    renderWithRouter(<ExploreFoods />);
    const title = screen.getByText('Explorar Comidas');
    expect(title).toBeInTheDocument();

    const exploreByIngBtn = screen.getByTestId('explore-by-ingredient');
    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    const exploreByAreaBtn = screen.getByTestId('explore-by-area');
    exploreByIngBtn.click();
    exploreSurpriseBtn.click();
    exploreByAreaBtn.click();
  });
});
