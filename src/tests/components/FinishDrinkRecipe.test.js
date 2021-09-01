import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../RenderWithRouter';
import FinishDrinkRecipe from '../../components/FinishDrinkRecipe';

describe('FinishDrinkRecipe component', () => {
  it('should render correctly', () => {
    const recipeData = {
      idDrink: 'id',
      strCategory: 'category',
      strAlcoholic: 'alcoholic',
      strDrink: 'Nome do drink',
      strDrinkThumb: 'imgUrl',
      strTags: ['tag1', 'tag2'],
    };
    renderWithRouter(
      <FinishDrinkRecipe
        checkIngredients="false"
        recipeData={ recipeData }
      />,
    );

    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
    finishRecipeBtn.click();
  });

  it('should render if there is data saved on localstorage', () => {
    const localStorageMock = {
      getItem: jest.fn().mockImplementation(() => [{ id: '52977', type: 'comida', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', doneDate: '22/6/2020', tags: ['S', 'o', 'u', 'p'] }, { id: '17222', type: 'bebida', area: '', category: 'Cocktail', alcoholicOrNot: 'Alcoholic', name: 'A1', image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg', doneDate: '23/6/2020', tags: [] }]),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;
    const recipeData = {
      idDrink: 'id',
      strCategory: 'category',
      strAlcoholic: 'alcoholic',
      strDrink: 'Nome do drink',
      strDrinkThumb: 'imgUrl',
      strTags: ['tag1', 'tag2'],
    };
    renderWithRouter(
      <FinishDrinkRecipe
        checkIngredients="false"
        recipeData={ recipeData }
      />,
    );

    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
    finishRecipeBtn.click();
  });
});
