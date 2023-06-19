import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Profile from '../pages/Profile';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Verifica se a página Profile é renderizada com as informações corretas', () => {
  const idEmail = 'email-input';
  const idPassword = 'password-input';
  const btnEntrar = /Enter/i;

  it('Verifica se é renderizado o e-mail armazenado no localStorage', () => {
    renderWithRouterAndContext(<App />);

    userEvent.type(screen.getByTestId(idEmail), 'trybe@teste.com');
    userEvent.type(screen.getByTestId(idPassword), '1234567');

    userEvent.click(screen.getByText(btnEntrar));
    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    const { email } = JSON.parse(localStorage.getItem('user'));
    expect(screen.getByTestId('profile-email').textContent).toBe(email);
  });

  it('Verifica se existe um botão com o texto "Done Recipes" que redireciona para a rota /done-recipes', async () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('profile-done-btn'));
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
  });

  it('Verifica se existe um botão com o texto "Favorite Recipes" que redireciona para a rota /favorite-recipes', async () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('profile-favorite-btn'));
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/favorite-recipes');
    });
  });

  it('Verifica se existe um botão com o texto "Logout" que redireciona para a rota "/"', async () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/');
      expect(localStorage.getItem('user')).toBe(null);
    });
  });
});
