import React from 'react';
import { render, screen } from '@testing-library/react';
import ExploreOptionButton from '../../components/ExploreOptionButton';

describe('ExploreOptionButton', () => {
  it('should render correctly', () => {
    const onClick = jest.fn();
    const props = {
      color: '#fff',
      handleClick: onClick,
      icon: 'imgUrl',
      text: 'texto botão',
    };
    render(<ExploreOptionButton { ...props } />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
