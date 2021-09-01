import React from 'react';
import { render, screen } from '@testing-library/react';
import DrinkRecommends from '../../components/DrinkRecommends';

describe('DrinkRecommends component', () => {
  it('should render drink recommendations', () => {
    render(<DrinkRecommends
      recommends={ [
        { strDrink: 'DrinkName' },
        { strDrink: 'DrinkName2' },
        { strDrink: 'DrinkName3' }] }
    />);
    const firstRecommendationCard = screen.getByTestId('0-recomendation-card');
    expect(firstRecommendationCard).toBeInTheDocument();
  });
});
