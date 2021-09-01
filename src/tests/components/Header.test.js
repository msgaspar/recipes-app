import React from 'react';
import { screen } from '@testing-library/react';
import FoodsProvider from '../../context/FoodsProvider';
import renderWithRouter from '../../RenderWithRouter';
import Header from '../../components/Header';

describe('Header component', () => {
  it('should render correctly', () => {
    renderWithRouter(
      <FoodsProvider>
        <Header title="Título" showSearchIcon />
      </FoodsProvider>,
    );
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    const searchBtn = screen.getByTestId('search-top-btn');
    searchBtn.click();
  });
});
