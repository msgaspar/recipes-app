import React from 'react';
import { screen, render } from '@testing-library/react';
import FoodDetails from '../pages/FoodDetails';

const foodMock = require('../../cypress/mocks/meals');

const mockUseLocationValue = {
  pathname: '/comidas/52977',
};

const mockUseHistoryValue = [];

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => mockUseLocationValue),
  useHistory: jest.fn().mockImplementation(() => mockUseHistoryValue),
  useParams: jest.fn().mockImplementation(() => ({ id: '52977' })),
}));

describe('FoodDetails page', () => {
  afterEach(() => jest.clearAllMocks());

  it('should render correctly', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodMock),
    });

    render(<FoodDetails />);
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const foodName = await screen.findByText('Corba');
    expect(foodName).toBeInTheDocument();
  });
});
