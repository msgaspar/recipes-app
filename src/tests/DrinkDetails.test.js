import React from 'react';
import { screen, render } from '@testing-library/react';
import DrinkDetails from '../pages/DrinkDetails';

const drinkMock = require('../../cypress/mocks/drinks');

const mockUseLocationValue = {
  pathname: '/bebidas/17222',
};

const mockUseHistoryValue = [];

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
  useHistory: jest.fn().mockImplementation(() => mockUseHistoryValue),
  useParams: jest.fn().mockImplementation(() => ({ id: '17222' })),
}));

describe('DrinkDetails page', () => {
  afterEach(() => jest.clearAllMocks());

  it('should render correctly', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkMock),
    });

    render(<DrinkDetails />);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const drinkName = await screen.findByText('GG');
    expect(drinkName).toBeInTheDocument();
  });
});
