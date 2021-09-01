import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import InProcessDrink from '../pages/InProcessDrink';
import { getDrinkRecipeDetails } from '../services/getRecipeDetails';

const drinkMock = require('../../cypress/mocks/oneDrink');

jest.mock('../services/getRecipeDetails');

describe('InProcessDrink page', () => {
  it('should render correctly', async () => {
    getDrinkRecipeDetails.mockResolvedValue(drinkMock.drinks[0]);
    renderWithRouter(<InProcessDrink />);

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const drink = await screen.findByText('Aquamarine');
    expect(drink).toBeInTheDocument();
  });
});
