import React from 'react';
import { render, screen } from '@testing-library/react';
import StartDrinkRecipes from '../../components/StartDrinkRecipes';

const mockUseHistoryValue = [];
const mockId = { id: '43948' };

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockImplementation(() => mockUseHistoryValue),
  useParams: jest.fn().mockImplementation(() => mockId),
}));

const startBtnId = 'start-recipe-btn';
const doneRecipes = '[{"id":"52977","type":"comida","area":"Turkish"'
+ ',"category":"Side","alcoholicOrNot":"","name":"Corba","image":'
+ '"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",'
+ '"doneDate":"22/6/2020","tags":["S","o","u","p"]},{"id":"17222","type":"bebida","area":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"A1","image":"https://www.thecock'
+ 'taildb.com/images/media/drink/2x8thr1504816928.jpg","doneDate"'
+ ':"23/6/2020","tags":[]}]';
const inProgressRecipes = '{"cocktails":{"17203":["Creme de Cassis"]},"meal'
+ 's":{"52804":["Potatoes","Beef Gravy"]}}';

describe('StartDrinkRecipes component', () => {
  it('should render correctly', () => {
    render(<StartDrinkRecipes />);
    const StartButton = screen.getByTestId(startBtnId);
    expect(StartButton).toBeInTheDocument();
    StartButton.click();
  });

  it('should render if there is a recipe in progress', () => {
    const localStorageMock = {
      getItem: (key) => {
        const returns = {
          doneRecipes,
          inProgressRecipes,
        };
        return returns[key];
      } };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    render(<StartDrinkRecipes />);
    const StartButton = screen.getByTestId(startBtnId);
    expect(StartButton).toBeInTheDocument();
    StartButton.click();
  });

  it('should render if it is a done recipe', () => {
    mockId.id = '52977';
    const localStorageMock = {
      getItem: (key) => {
        const returns = {
          doneRecipes,
          inProgressRecipes,
          other: 'other',
        };
        return returns[key];
      } };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    render(<StartDrinkRecipes />);
    const StartButton = screen.getByTestId(startBtnId);
    expect(StartButton).toBeInTheDocument();
    StartButton.click();
  });

  it('should render if recipe is in progress', () => {
    mockId.id = '17203';
    const localStorageMock = {
      getItem: (key) => {
        const returns = {
          doneRecipes,
          inProgressRecipes,
          other: 'othfer',
        };
        return returns[key];
      } };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    render(<StartDrinkRecipes />);
    const StartButton = screen.getByTestId('start-recipe-btn');
    expect(StartButton).toBeInTheDocument();
    StartButton.click();
  });
});
