import React from 'react';
import { screen } from '@testing-library/react';
import copy from 'clipboard-copy';
import renderWithRouter from '../../RenderWithRouter';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';

jest.mock('clipboard-copy', () => jest.fn());

describe('FavoriteRecipeCard component', () => {
  afterEach(() => jest.clearAllMocks());
  it('should render correctly for a meal', () => {
    const mealItem = {
      type: 'comida',
      id: 'id',
      image: 'imageUrl',
      area: 'area',
      category: 'categoria',
      name: 'Comida',
      alcoholicOrNot: '',
    };
    const onToggleFavorite = jest.fn();
    renderWithRouter(
      <FavoriteRecipeCard
        item={ mealItem }
        index={ 2 }
        onToggleFavorite={ onToggleFavorite }
      />,
    );
    const shareButton = screen.getByTestId('2-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();
    shareButton.click();
    expect(copy).toBeCalledTimes(1);

    const favoriteButton = screen.getByTestId('2-horizontal-favorite-btn');
    favoriteButton.click();
    expect(onToggleFavorite).toBeCalledTimes(1);
  });

  it('should render correctly for a drink', () => {
    const drinkItem = {
      type: 'bebida',
      id: 'id',
      image: 'imageUrl',
      area: 'area',
      category: 'categoria',
      name: 'Comida',
      alcoholicOrNot: 'alcoholic',
    };
    const onToggleFavorite = jest.fn();
    renderWithRouter(
      <FavoriteRecipeCard
        item={ drinkItem }
        index={ 2 }
        onToggleFavorite={ onToggleFavorite }
      />,
    );
    const shareButton = screen.getByTestId('2-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();
    shareButton.click();
    expect(copy).toBeCalledTimes(1);

    const favoriteButton = screen.getByTestId('2-horizontal-favorite-btn');
    favoriteButton.click();
    expect(onToggleFavorite).toBeCalledTimes(1);
  });
});
