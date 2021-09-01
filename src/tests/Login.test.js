import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import Login from '../pages/Login';

describe('Login page', () => {
  it('should render correctly', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });

    const passWordInput = screen.getByTestId('password-input');
    fireEvent.change(passWordInput, { target: { value: 'senha123343' } });

    const loginButton = screen.getByTestId('login-submit-btn');
    loginButton.click();
  });
});
