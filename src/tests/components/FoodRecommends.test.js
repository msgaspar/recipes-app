import React from 'react';
import { render, screen } from '@testing-library/react';
import FoodRecommends from '../../components/FoodRecommends';

describe('FoodRecommends component', () => {
  it('should render food recommendations', () => {
    render(<FoodRecommends
      recommends={ [
        { strMeal: 'MealName' },
        { strMeal: 'MealName2' },
        { strMeal: 'MealName3' }] }
    />);
    const firstRecommendationCard = screen.getByTestId('0-recomendation-card');
    expect(firstRecommendationCard).toBeInTheDocument();
  });
});
