import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import ExploreFoodsByIngredients from '../pages/ExploreFoodsByIngredients';
import FoodsProvider from '../context/FoodsProvider';
import { fetchIngredientsFood } from '../services/foodSearch';

const foodIngredientsMock = require('../../cypress/mocks/mealIngredients');

jest.mock('../services/foodSearch');

describe('ExploreFoodsByIngredients page', () => {
  it('should render correctly', async () => {
    fetchIngredientsFood.mockResolvedValue(foodIngredientsMock);
    renderWithRouter(
      <FoodsProvider>
        <ExploreFoodsByIngredients />
      </FoodsProvider>,
    );
    const title = screen.getByText('Explorar Ingredientes');
    expect(title).toBeInTheDocument();

    const chicken = await screen.findByText('Chicken');
    expect(chicken).toBeInTheDocument();

    const ingredientCard = screen.getByTestId('0-ingredient-card');
    ingredientCard.click();
  });
});
