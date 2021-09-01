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

    const sectionTitle = screen.getByText('Ingredients');
    expect(sectionTitle).toBeInTheDocument();
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

    const ingredientCheckBox = screen.getByText('ingrediente1');
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

    const ingredientCheckBox2 = screen.getByText('ingrediente2');
    const ingredientCheckBox3 = screen.getByText('ingrediente3');
    ingredientCheckBox2.click();
    ingredientCheckBox3.click();
    expect(setCheckIngredients).toBeCalledWith(true);
  });
});
