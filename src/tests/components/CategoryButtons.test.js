import React from 'react';
import { render, screen } from '@testing-library/react';
import FoodsProvider from '../../context/FoodsProvider';
import CategoryButtons from '../../components/CategoryButtons';

const mockUseLocationValue = {
  pathname: '/',
};

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
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

    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
  });

  it('should display button All correctly for drinks', () => {
    mockUseLocationValue.pathname = '/bebidas';
    render(
      <FoodsProvider>
        <CategoryButtons />
      </FoodsProvider>,
    );

    expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
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
});
