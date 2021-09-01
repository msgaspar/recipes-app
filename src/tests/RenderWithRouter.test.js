import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

jest.mock('@testing-library/react', () => ({
  render: jest.fn(),
}));

describe('RenderWithRouter file', () => {
  it('should call render method', () => {
    renderWithRouter(<App />);
    expect(render).toBeCalledTimes(1);
  });
});
