import React from 'react';
import { screen } from '@testing-library/react';
import copy from 'clipboard-copy';
import renderWithRouter from '../../RenderWithRouter';
import DoneRecipeCard from '../../components/DoneRecipeCard';

jest.mock('clipboard-copy', () => jest.fn());

afterEach(() => jest.clearAllMocks());
describe('DoneRecipeCard component', () => {
  it('should render correctly for meals', () => {
    const mealItem = {
      type: 'comida',
      id: 'id',
      image: 'imageUrl',
      area: 'area',
      category: 'categoria',
      name: 'Comida',
      doneDate: 'data',
      alcoholicOrNot: '',
      tags: ['tag1', 'tag2'],
    };

    renderWithRouter(<DoneRecipeCard item={ mealItem } index={ 1 } />);
    const mealName = screen.getByTestId('1-horizontal-name');
    expect(mealName).toBeInTheDocument();
  });

  it('should render correctly for drinks', () => {
    const drinkItem = {
      type: 'bebida',
      id: 'id',
      image: 'imageUrl',
      area: 'area',
      category: 'categoria',
      name: 'Prato',
      doneDate: 'data',
      alcoholicOrNot: 'alcoholic',
      tags: ['tag1', 'tag2'],
    };

    renderWithRouter(<DoneRecipeCard item={ drinkItem } index={ 1 } />);
    const mealName = screen.getByTestId('1-horizontal-name');
    expect(mealName).toBeInTheDocument();
  });

  it('should call copy function when copy button is clicked for a meal', () => {
    const mealItem = {
      type: 'comida',
      id: 'id',
      image: 'imageUrl',
      area: 'area',
      category: 'categoria',
      name: 'Nome do prato',
      doneDate: 'data',
      alcoholicOrNot: 'alcoholic',
      tags: ['tag1', 'tag2'],
    };
    renderWithRouter(<DoneRecipeCard item={ mealItem } index={ 1 } />);
    const copyButton = screen.getByTestId('1-horizontal-share-btn');
    copyButton.click();
    expect(copy).toBeCalledTimes(1);
  });

  it('should call copy function when copy button is clicked for a drink', () => {
    const drinkItem = {
      type: 'bebida',
      id: 'id',
      image: 'imageUrl',
      area: 'area',
      category: 'categoria',
      name: 'Nome do prato',
      doneDate: 'data',
      alcoholicOrNot: 'alcoholic',
      tags: ['tag1', 'tag2'],
    };
    renderWithRouter(<DoneRecipeCard item={ drinkItem } index={ 1 } />);
    const copyButton = screen.getByTestId('1-horizontal-share-btn');
    copyButton.click();
    expect(copy).toBeCalledTimes(1);
  });
});
