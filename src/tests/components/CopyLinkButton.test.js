import React from 'react';
import { render, screen } from '@testing-library/react';
import CopyLinkButton from '../../components/CopyLinkButton';

jest.mock('clipboard-copy', () => jest.fn());

describe('CopyLinkButton component', () => {
  it('should display button with the correct test id', () => {
    render(<CopyLinkButton />);
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
  });

  it('should display message when button is clicked', async () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      href: 'http://localhost/comidas/example_id',
    };
    render(<CopyLinkButton />);
    const button = screen.getByTestId('share-btn');
    button.click();
    const message = await screen.findByText('Link copiado!');
    expect(message).toBeInTheDocument();
  });
});
