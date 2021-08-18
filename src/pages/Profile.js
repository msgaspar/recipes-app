import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  // Converte a string em um objeto e atribui um novo valor ao email.
  useEffect(() => {
    const getEmail = () => {
      const profileEmail = JSON.parse(localStorage.getItem('user'));
      if (profileEmail !== null) {
        setEmail(profileEmail.email);
      }
    };
    getEmail();
  },
  []);

  // Limpa o localStorage.
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Perfil" />
      <div
        className="d-flex flex-column align-items-center"
        style={ {
          paddingTop: '80px',
        } }
        data-testid="profile-email"
      >
        <h2
          className="my-5"
        >
          { email }

        </h2>

        <Button
          className="w-75 my-2"
          variant="warning"
          size="lg"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </Button>
        <Button
          className="w-75 my-2"
          variant="warning"
          size="lg"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </Button>
        <Button
          className="w-75 my-2"
          variant="warning"
          size="lg"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Sair
        </Button>
      </div>
      <LowerMenu />
    </div>
  );
}
