import React from 'react';
import { screen } from '@testing-library/react';
import DrinkRecipes from '../pages/DrinkRecipes';
import FoodsProvider from '../context/FoodsProvider';
import renderWithRouter from '../RenderWithRouter';

describe('DrinkRecipes page', () => {
  it('should render correctly', () => {
    renderWithRouter(
      <FoodsProvider>
        <DrinkRecipes />
      </FoodsProvider>,
    );
    const title = screen.getByText('Bebidas');
    expect(title).toBeInTheDocument();
  });
});
