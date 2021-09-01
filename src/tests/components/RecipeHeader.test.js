import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeHeader from '../../components/RecipeHeader';

const mockUseLocationValue = {
  pathname: 'localhost/comidas',
};

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
  useParams: jest.fn().mockImplementation(() => ({ id: 'id87' })),
}));

describe('RecipeHeader component', () => {
  afterEach(() => jest.clearAllMocks());

  it('should render correctly', () => {
    const props = {
      imgUrl: 'imgUrl',
      category: 'category',
      name: 'receita',
      type: 'comida',
      area: 'país',
      alcoholicOrNot: 'alcoholic',
    };
    render(<RecipeHeader { ...props } />);
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });

  it('should render correctly for a drink', () => {
    mockUseLocationValue.pathname = '/bebidas';
    const props = {
      imgUrl: 'imgUrl',
      category: 'category',
      name: 'nome da receita',
      type: 'bebida',
      area: 'país',
      alcoholicOrNot: 'alcoholic',
    };
    render(<RecipeHeader { ...props } />);
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });

  it('should be possible to mark the recipe as favorite', () => {
    const props = {
      imgUrl: 'imgUrl',
      category: 'category',
      name: 'nome da receita',
      type: 'comida',
      area: 'país',
      alcoholicOrNot: 'alcoholic',
    };
    render(<RecipeHeader { ...props } />);
    const favoriteBtn = screen.getByTestId('favorite-btn');
    favoriteBtn.click();
    expect(favoriteBtn).toHaveAttribute('src');
  });
});
