import React from 'react';

export default function Login() {
  return (
    <div>
      <label htmlFor="email">
        E-mail:
        <input
          type="email"
          name="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          name="password"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </div>
  );
}
