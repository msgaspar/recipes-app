import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import ExploreFoodsByArea from '../pages/ExploreFoodsByArea';
import {
  fetchRecipeCountry,
  fetchRecipeAllFood,
  fetchRecipeBySelectedCountry,
} from '../services/foodSearch';

const countriesMock = require('../../cypress/mocks/areas');
const mealsMock = require('../../cypress/mocks/meals');
const italianMealsMock = require('../../cypress/mocks/italianMeals');

jest.mock('../services/foodSearch');

describe('ExploreFoodsByArea page', () => {
  it('should render correctly', async () => {
    fetchRecipeCountry.mockResolvedValue(countriesMock);
    fetchRecipeAllFood.mockResolvedValue(mealsMock);
    fetchRecipeBySelectedCountry.mockResolvedValue(italianMealsMock);

    renderWithRouter(<ExploreFoodsByArea />);

    const pageTitle = screen.getByText('Explorar Origem');
    expect(pageTitle).toBeInTheDocument();

    const americanOption = await screen.findByText('American');
    expect(americanOption).toBeInTheDocument();

    const firstRecipe = screen.getByTestId('0-recipe-card');
    firstRecipe.click();

    const selectCountry = screen.getByTestId('explore-by-area-dropdown');
    fireEvent.change(selectCountry, { target: { value: 'Italian' } });
  });
});
