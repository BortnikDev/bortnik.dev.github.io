import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouter } from './helpers/renderWithRouter';

// Page Login
describe('A aplicação renderiza uma página de login para acessar as receitas', () => {
  const idEmail = 'email-input';
  const idPassword = 'password-input';
  const btnEntrar = /Enter/i;

  it('Será verificado se é renderizado um elemento para que o usuário insira seu email e senha', () => {
    render(<Login />);
    expect(screen.getByTestId(idEmail)).toBeInTheDocument();
    expect(screen.getByTestId(idPassword)).toBeInTheDocument();
  });

  it('Será verificado se é renderizado um botão com o texto entrar', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: btnEntrar })).toBeInTheDocument();
  });

  it('Será verificado se o botão está desabilitado ao digitar um email inválido e uma senha inválida', () => {
    render(<Login />);
    userEvent.type(screen.getByTestId(idEmail), 'trybe@testecom');
    userEvent.type(screen.getByTestId(idPassword), '12345');
    expect(screen.getByRole('button', { name: btnEntrar })).toHaveAttribute('disabled');
  });

  it('Será verificado se o botão está habilitado ao digitar uma senha válida e um email válido e ao clicar a aplicação é redirecionada para a página /carteira', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.type(screen.getByTestId(idEmail), 'trybe@teste.com');
    userEvent.type(screen.getByTestId(idPassword), '1234567');

    expect(screen.getByRole('button', { name: btnEntrar })).not.toBeDisabled();

    userEvent.click(screen.getByText(btnEntrar));
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
