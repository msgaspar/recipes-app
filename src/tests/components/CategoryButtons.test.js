import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipesRender from '../../components/RecipesRender';
import FoodsProvider from '../../context/FoodsProvider';
import CategoryButtons from '../../components/CategoryButtons';

const mealCategoriesMock = require('../../../cypress/mocks/mealCategories');
const drinkCategoriesMock = require('../../../cypress/mocks/drinkCategories');

const mockUseLocationValue = {
  pathname: '/',
};

const mockUseHistoryValue = [];

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
  useHistory: jest.fn().mockImplementation(() => mockUseHistoryValue),
}));

describe('CategoryButtons component', () => {
  afterEach(() => jest.clearAllMocks());
  it('should display button All correctly for meals', () => {
    mockUseLocationValue.pathname = '/comidas';
    render(
      <FoodsProvider>
        <CategoryButtons />
      </FoodsProvider>,
    );

    const allFilterButton = screen.getByTestId('All-category-filter');
    expect(allFilterButton).toBeInTheDocument();
    allFilterButton.click();
  });

  it('should display button All correctly for drinks', () => {
    mockUseLocationValue.pathname = '/bebidas';
    render(
      <FoodsProvider>
        <CategoryButtons />
      </FoodsProvider>,
    );

    const allFilterButton = screen.getByTestId('All-category-filter');
    expect(allFilterButton).toBeInTheDocument();
    allFilterButton.click();
  });

  it('should call the API with the correct url for meals', () => {
    mockUseLocationValue.pathname = '/comidas';
    jest.spyOn(global, 'fetch');

    render(
      <FoodsProvider>
        <CategoryButtons />
      </FoodsProvider>,
    );

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  });

  it('should call the API with the correct url for meals', () => {
    mockUseLocationValue.pathname = '/bebidas';
    jest.spyOn(global, 'fetch');

    render(
      <FoodsProvider>
        <CategoryButtons />
      </FoodsProvider>,
    );

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  });

  it('should display more than one filter option for meals', async () => {
    mockUseLocationValue.pathname = '/comidas';
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategoriesMock),
    });
    render(
      <FoodsProvider>
        <CategoryButtons />
      </FoodsProvider>,
    );
    await screen.findByText('Beef');
    const beefButton = screen.getByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();
    beefButton.click();
    beefButton.click();
  });

  it('should display more than one filter option for drinks', async () => {
    mockUseLocationValue.pathname = '/bebidas';
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategoriesMock),
    });
    render(
      <FoodsProvider>
        <CategoryButtons />
      </FoodsProvider>,
    );
    await screen.findByText('Cocoa');
    const cocoaButton = screen.getByTestId('Cocoa-category-filter');
    expect(cocoaButton).toBeInTheDocument();
    cocoaButton.click();
    cocoaButton.click();
  });

  it('should update state when button is clicked', async () => {
    mockUseLocationValue.pathname = '/comidas';

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategoriesMock),
    });

    render(
      <FoodsProvider>
        <RecipesRender />
      </FoodsProvider>,
    );
    await screen.findByText('Beef');
    const beefButton = screen.getByTestId('Beef-category-filter');
    beefButton.click();
    const recipe = await screen.getByTestId('0-card-name');
    expect(recipe).toBeInTheDocument();
    beefButton.click();
  });

  it('should update state when button is clicked for drinks', async () => {
    mockUseLocationValue.pathname = '/bebidas';

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategoriesMock),
    });

    render(
      <FoodsProvider>
        <RecipesRender />
      </FoodsProvider>,
    );
    await screen.findByText('Cocoa');
    const cocoaButton = screen.getByTestId('Cocoa-category-filter');
    cocoaButton.click();
    const recipe = await screen.getByTestId('0-card-name');
    expect(recipe).toBeInTheDocument();
    cocoaButton.click();
  });
});
