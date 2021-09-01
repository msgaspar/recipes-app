import React from 'react';
import { screen, render } from '@testing-library/react';
import IngredientsCheckList from '../../components/IngredientsCheckList';

const mockUseLocationValue = {
  pathname: 'localhost/comidas',
};

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
  useParams: jest.fn().mockImplementation(() => ({ id: 'id87' })),
}));

describe('IngredientsCheckList component', () => {
  afterEach(() => jest.clearAllMocks());
  it('should render correctly', () => {
    const ingredients = ['ingrediente1', 'ingrediente2', 'ingrediente3'];
    const setCheckIngredients = jest.fn();

    render(
      <IngredientsCheckList
        ingredients={ ingredients }
        setAllIngredientsChecked={ setCheckIngredients }
      />,
    );

    const firstIngredient = screen.getByTestId('0-ingredient-step');
    expect(firstIngredient).toBeInTheDocument();
  });

  it('should be possible to check an ingredient', () => {
    const ingredients = ['ingrediente1', 'ingrediente2', 'ingrediente3'];
    const setCheckIngredients = jest.fn();

    render(
      <IngredientsCheckList
        ingredients={ ingredients }
        setAllIngredientsChecked={ setCheckIngredients }
      />,
    );

    const ingredientCheckBox = screen.getByTestId('0-ingredient-step-input');
    ingredientCheckBox.click();
    expect(setCheckIngredients).toBeCalledTimes(1);
  });

  it('should call function if all ingredients are checked', () => {
    mockUseLocationValue.pathname = '/bebidas';
    const ingredients = ['ingrediente1', 'ingrediente2', 'ingrediente3'];
    const setCheckIngredients = jest.fn();

    render(
      <IngredientsCheckList
        ingredients={ ingredients }
        setAllIngredientsChecked={ setCheckIngredients }
      />,
    );

    const ingredientCheckBox2 = screen.getByTestId('1-ingredient-step-input');
    const ingredientCheckBox3 = screen.getByTestId('2-ingredient-step-input');
    ingredientCheckBox2.click();
    ingredientCheckBox3.click();
    expect(setCheckIngredients).toBeCalledWith(true);
  });
});
