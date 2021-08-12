import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Logo from '../images/logo.jpg';

export default function Login() {
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const history = useHistory();

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
    history.push('/comidas');
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center mx-auto"
      style={ {
        height: '100vh',
        maxWidth: '400px',
      } }
    >
      <Row>
        <Col className="text-center">
          <Image
            style={ {
              height: '220px',
            } }
            src={ Logo }
          />
        </Col>
      </Row>
      <Row>
        <Col
          className="d-flex flex-column align-items-center mx-2"
        >
          <label
            className="d-flex flex-column w-100 mb-3"
            htmlFor="email"
            style={ {
              color: '#363846',
              fontWeight: 'bold',
            } }
          >
            Email
            <input
              style={ {
                height: '56px',
                outline: 0,
                borderRadius: '4px',
                border: 'none',
                background: '#f6f6f6',
                fontSize: '18px',
              } }
              className="w-100 px-3 mt-2"
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ handleEmail }
              autoComplete="off"
            />
          </label>
          <label
            className="d-flex flex-column w-100 mb-4"
            htmlFor="password"
            style={ {
              color: '#363846',
              fontWeight: 'bold',
            } }
          >
            Senha
            <input
              style={ {
                height: '56px',
                outline: 0,
                borderRadius: '4px',
                border: 'none',
                background: '#f6f6f6',
                fontSize: '18px',
              } }
              className="w-100 px-3 mt-2"
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ handlePassword }
            />
          </label>
          <Button
            className="w-100 mb-5"
            style={ {
              height: '56px',
              borderRadius: '4px',
              border: 'none',
              color: '#fff',
              fontWeight: 'bold',
            } }
            type="button"
            data-testid="login-submit-btn"
            disabled={ invalidEmail || invalidPassword }
            onClick={ handleClick }
          >
            Entrar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
