import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');

  // Verifica se o email é válido
  const handleEmail = (event) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(event.target.value)) {
      setInvalidEmail(false);
      setLoginEmail(event.target.value);
    }
  };

  // Verifica se a senha é válida
  const handlePassword = (event) => {
    const password = event.target.value;
    const lengthPassword = 6;
    if (password.length > lengthPassword) {
      setInvalidPassword(false);
    }
  };

  // Adiciona os dados no local storage
  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: loginEmail }));
  };

  return (
    <div>
      <label htmlFor="email">
        E-mail:
        <input
          type="email"
          name="email"
          data-testid="email-input"
          onChange={ handleEmail }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ handlePassword }
        />
      </label>
      <Link
        to="/comidas"
      >
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ invalidEmail || invalidPassword }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}
