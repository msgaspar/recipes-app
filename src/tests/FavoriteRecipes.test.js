import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const favoriteRecipes = '[{"id":"52977","type":"comida","area":"Turkish","category":"Side","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg","alcoholicOrNot":""},{"id":"52785","type":"comida","area":"Indian","category":"Vegetarian","name":"Dal fry","image":"https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg","alcoholicOrNot":""},{"id":"15997","type":"bebida","area":"","category":"Ordinary Drink","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg","alcoholicOrNot":"Optional alcohol"}]';
const setFavoriteRecipes = jest.fn();

describe('FavoriteRecipes page', () => {
  it('should render correctly', () => {
    const localStorageMock = {
      getItem: () => favoriteRecipes,
      setItem: setFavoriteRecipes,
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    renderWithRouter(<FavoriteRecipes />);

    const title = screen.getByText('Receitas Favoritas');
    expect(title).toBeInTheDocument();

    const firstRecipeName = screen.getByTestId('0-horizontal-name');
    expect(firstRecipeName).toBeInTheDocument();

    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    filterByDrinkBtn.click();

    const filterByFoodBtn = screen.getByTestId('filter-by-food-btn');
    filterByFoodBtn.click();

    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    filterByAllBtn.click();

    const toggleFavoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    toggleFavoriteBtn.click();
  });
});
