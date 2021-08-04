import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function Profile() {
  const [email, setEmail] = useState('');

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
  };

  return (
    <div>
      <Header title="Perfil" />
      <div data-testid="profile-email">{ email }</div>
      <Link
        to="/receitas-favoritas"
      >
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link
        to="/receitas-feitas"
      >
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link
        to="/"
      >
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </Link>
      <LowerMenu />
    </div>
  );
}
