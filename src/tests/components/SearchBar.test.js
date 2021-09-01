import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';
import FoodsProvider from '../../context/FoodsProvider';
import FoodsContext from '../../context/FoodsContext';
import {
  searchFoodByFirstLetter,
  searchFoodByName,
  searchFoodByIngredient,
} from '../../services/foodSearch';
import {
  searchDrinkByFirstLetter,
  searchDrinkByName,
  searchDrinkByIngredient,
} from '../../services/drinkSearch';

jest.mock('../../services/foodSearch');
jest.mock('../../services/drinkSearch');

const mockUseLocationValue = {
  pathname: '/comidas',
};

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
  Redirect: (props) => <div { ...props } /> }));

const searchInputTestId = 'search-input';
const firstLetterRadioId = 'first-letter-search-radio';
const ingredientRadioId = 'ingredient-search-radio';
const nameSearchRadioId = 'name-search-radio';
const execSearchId = 'exec-search-btn';

describe('SearchBar component', () => {
  afterEach(() => jest.clearAllMocks());
  it('should render correctly', () => {
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const firstLetterSearchRadioButton = screen.getByTestId(firstLetterRadioId);
    const ingredientSearchRadioButton = screen.getByTestId(ingredientRadioId);
    const nameSearchRadioButton = screen.getByTestId(nameSearchRadioId);
    firstLetterSearchRadioButton.click();
    ingredientSearchRadioButton.click();
    nameSearchRadioButton.click();

    fireEvent.change(searchInput, { target: { value: 'Mustard' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });

  it('should redirect correctly', () => {
    const context = {
      recipeData: [{ strMeal: 'recipe1' }],
    };
    render(
      <FoodsContext.Provider value={ context }>
        <SearchBar />
      </FoodsContext.Provider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
  });

  it('should redirect correctly for a drink', () => {
    mockUseLocationValue.pathname = '/bebidas';
    const context = {
      recipeData: [{ strDrink: 'recipe1' }],
    };
    render(
      <FoodsContext.Provider value={ context }>
        <SearchBar />
      </FoodsContext.Provider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
  });

  it('should alert tries to search by first letter with more than one character', () => {
    window.alert = jest.fn();
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const firstLetterSearchRadioButton = screen.getByTestId(firstLetterRadioId);
    firstLetterSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'aa' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
    expect(window.alert).toBeCalledTimes(1);
  });

  it('should do search for first letter and foods', () => {
    mockUseLocationValue.pathname = '/comidas';
    searchFoodByFirstLetter.mockResolvedValue('oi');
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const firstLetterSearchRadioButton = screen.getByTestId(firstLetterRadioId);
    firstLetterSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'a' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });

  it('should do alert for first letter and foods', () => {
    window.alert = jest.fn();
    mockUseLocationValue.pathname = '/comidas';
    searchFoodByFirstLetter.mockResolvedValue(undefined);
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const firstLetterSearchRadioButton = screen.getByTestId(firstLetterRadioId);
    firstLetterSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'a' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });

  it('should search for name and foods', () => {
    window.alert = jest.fn();
    mockUseLocationValue.pathname = '/comidas';
    searchFoodByName.mockResolvedValue('data');
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const nameSearchRadioButton = screen.getByTestId(nameSearchRadioId);
    nameSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'beef' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });

  it('should search for ingredient and foods', () => {
    window.alert = jest.fn();
    mockUseLocationValue.pathname = '/comidas';
    searchFoodByIngredient.mockResolvedValue('data');
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const ingredientSearchRadioButton = screen.getByTestId(ingredientRadioId);
    ingredientSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'beef' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });

  it('should do search for first letter and drinks', () => {
    mockUseLocationValue.pathname = '/bebidas';
    searchDrinkByFirstLetter.mockResolvedValue('oi');
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const firstLetterSearchRadioButton = screen.getByTestId(firstLetterRadioId);
    firstLetterSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'a' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });

  it('should do alert for first letter and drinks', () => {
    window.alert = jest.fn();
    mockUseLocationValue.pathname = '/bebidas';
    searchDrinkByFirstLetter.mockResolvedValue(undefined);
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const firstLetterSearchRadioButton = screen.getByTestId(firstLetterRadioId);
    firstLetterSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'a' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });

  it('should search for name and drinks', () => {
    window.alert = jest.fn();
    mockUseLocationValue.pathname = '/bebidas';
    searchDrinkByName.mockResolvedValue('data');
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const nameSearchRadioButton = screen.getByTestId(nameSearchRadioId);
    nameSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'beef' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });

  it('should search for ingredient and drinks', () => {
    window.alert = jest.fn();
    mockUseLocationValue.pathname = '/bebidas';
    searchDrinkByIngredient.mockResolvedValue('data');
    render(
      <FoodsProvider>
        <SearchBar />
      </FoodsProvider>,
    );
    const searchInput = screen.getByTestId(searchInputTestId);
    expect(searchInput).toBeInTheDocument();
    const ingredientSearchRadioButton = screen.getByTestId(ingredientRadioId);
    ingredientSearchRadioButton.click();
    fireEvent.change(searchInput, { target: { value: 'beef' } });
    const searchButton = screen.getByTestId(execSearchId);
    fireEvent.click(searchButton);
  });
});
