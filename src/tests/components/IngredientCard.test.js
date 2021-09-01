import React from 'react';
import { render, screen } from '@testing-library/react';
import IngredientCard from '../../components/IngredientCard';

describe('IngredientCard component', () => {
  it('should render correctly', () => {
    const props = {
      name: 'Nome',
      index: 2,
      handleClick: jest.fn(),
      imgUrl: 'imgUrl',
    };
    render(<IngredientCard { ...props } />);
    const cardName = screen.getByTestId('2-card-name');
    expect(cardName).toBeInTheDocument();
  });
});
