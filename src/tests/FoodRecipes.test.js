import React from 'react';
import { screen } from '@testing-library/react';
import FoodRecipes from '../pages/FoodRecipes';
import FoodsProvider from '../context/FoodsProvider';
import renderWithRouter from '../RenderWithRouter';

describe('FoodRecipes page', () => {
  it('should render correctly', () => {
    renderWithRouter(
      <FoodsProvider>
        <FoodRecipes />
      </FoodsProvider>,
    );
    const title = screen.getByText('Comidas');
    expect(title).toBeInTheDocument();
  });
});
