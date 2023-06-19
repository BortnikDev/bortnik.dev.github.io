import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/Login.css';
import iconTitleBook from '../css/images/iconTitleBook.png';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const verifyForm = () => {
    const minNum = 6;
    const emailValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    const passValid = password.length > minNum;
    const validCases = [emailValid, passValid];
    const verifyInputs = validCases.every((valid) => valid);
    return !verifyInputs;
  };

  const goToRecipes = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login__page">
      <div className="login__container">
        <div className="login__title">
          <div className="title">
            <img src={ iconTitleBook } alt="iconTtitle" />
            <h1>Recipes</h1>
          </div>
          <h3 className="subtitle">app</h3>
        </div>
        <div className="login__input">
          <input
            type="text"
            data-testid="email-input"
            placeholder="Digite o seu email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />

          <input
            type="password"
            data-testid="password-input"
            placeholder="Digite a sua senha"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />

          <button
            data-testid="login-submit-btn"
            disabled={ verifyForm() }
            onClick={ goToRecipes }
            className="login__button"
          >
            Enter
          </button>
        </div>
      </div>
      <footer className="footer-login">
        <span>Copyright © Recipes App | All Rights Reserved</span>
      </footer>
    </div>
  );
}
