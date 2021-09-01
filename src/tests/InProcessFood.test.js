import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import InProcessFood from '../pages/InProcessFood';
import { getFoodRecipeDetails } from '../services/getRecipeDetails';

const mealMock = require('../../cypress/mocks/oneMeal');

jest.mock('../services/getRecipeDetails');

describe('InProcessFood page', () => {
  it('should render correctly', async () => {
    getFoodRecipeDetails.mockResolvedValue(mealMock.meals[0]);
    renderWithRouter(<InProcessFood />);

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const drink = await screen.findByText('Spicy Arrabiata Penne');
    expect(drink).toBeInTheDocument();
  });
});
