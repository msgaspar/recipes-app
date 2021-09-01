import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import ExploreDrinksByIngredients from '../pages/ExploreDrinksByIngredients';
import FoodsProvider from '../context/FoodsProvider';
import { fetchIngredientsDrink } from '../services/drinkSearch';

const drinkIngredientsMock = require('../../cypress/mocks/drinkIngredients');

jest.mock('../services/drinkSearch');

describe('ExploreDrinksByIngredients page', () => {
  it('should render correctly', async () => {
    fetchIngredientsDrink.mockResolvedValue(drinkIngredientsMock);
    renderWithRouter(
      <FoodsProvider>
        <ExploreDrinksByIngredients />
      </FoodsProvider>,
    );
    const title = screen.getByText('Explorar Ingredientes');
    expect(title).toBeInTheDocument();

    const lightRum = await screen.findByText('Light rum');
    expect(lightRum).toBeInTheDocument();

    const ingredientCard = screen.getByTestId('0-ingredient-card');
    ingredientCard.click();
  });
});
