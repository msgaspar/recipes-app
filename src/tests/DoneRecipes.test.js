import React from 'react';
import { screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from '../RenderWithRouter';

const doneRecipes = '[{"id":"52977","type":"comida","area":"Turkish"'
+ ',"category":"Side","alcoholicOrNot":"","name":"Corba","image":'
+ '"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",'
+ '"doneDate":"22/6/2020","tags":["S","o","u","p"]},{"id":"17222","type":"bebida","area":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"A1","image":"https://www.thecock'
+ 'taildb.com/images/media/drink/2x8thr1504816928.jpg","doneDate"'
+ ':"23/6/2020","tags":[]}]';

describe('tests page DoneRecipes(/receitas-feitas)', () => {
  it('should render correctly', () => {
    const localStorageMock = {
      getItem: () => doneRecipes,
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    renderWithRouter(<DoneRecipes />);
    const corbaRecipe = screen.getByText('Receitas Feitas');
    expect(corbaRecipe).toBeInTheDocument();

    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    filterByDrinkBtn.click();
    const filterByFoodBtn = screen.getByTestId('filter-by-food-btn');
    filterByFoodBtn.click();
    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    filterByAllBtn.click();
  });
});
