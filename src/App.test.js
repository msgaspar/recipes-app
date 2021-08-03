import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import App from './App';
import Login from './pages/Login';

const renderWithRouter = (component) => {
  const history = createMemoryHistory()
  history.push(route)
  return ({
    ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
    history,
  });
}


// O renderWithRouter foi retirado de: 'https://cibersistemas.pt/tecnologia/como-comecar-a-testar-seus-aplicativos-do-react-usando-a-biblioteca-de-testes-do-react-e-o-jest/'

describe('Testando a Tela de Login', () => {
  it('', () => {
    const { getByText } = renderWithRouter(<Login />);
    const aboutPokedex = getByText('E-mail:');

    expect(aboutPokedex).toBeInTheDocument();
  })
})