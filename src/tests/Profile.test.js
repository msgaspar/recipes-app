import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import Profile from '../pages/Profile';

describe('Profile page', () => {
  it('should render correctly', () => {
    renderWithRouter(<Profile />);

    const pageTitle = screen.getByText('Perfil');
    expect(pageTitle).toBeInTheDocument();

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesButton);

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesButton);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);
  });

  it('should show email if it is saved on localstorage', () => {
    const localStorageMock = {
      getItem: () => '{"email":"a@b.c"}',
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    renderWithRouter(<Profile />);

    const emailAddress = screen.getByText('a@b.c');
    expect(emailAddress).toBeInTheDocument();
  });
});
