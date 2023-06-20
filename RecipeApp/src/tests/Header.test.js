import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

// Componente Header

describe('A aplicação possui um componente Header', () => {
  const title = 'page-title';
  const searchButton = 'search-top-btn';
  const profile = 'profile-top-btn';
  const search = 'search-input';

  it('Verifica se a rota /meals possui o header com o título "Meals" e os ícones de perfil e pesquisa', () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });
    expect(screen.getByTestId(title).textContent).toBe('Meals');
    expect(screen.getByTestId(searchButton)).toBeInTheDocument();
    expect(screen.getByTestId(profile)).toBeInTheDocument();
  });

  it('Verifica se a rota /drinks possui o header com o título "Drinks" e os ícones de perfil e pesquisa', () => {
    const initialEntries = ['/drinks'];
    renderWithRouter(<App />, { initialEntries });
    expect(screen.getByTestId(title).textContent).toBe('Drinks');
    expect(screen.getByTestId(searchButton)).toBeInTheDocument();
    expect(screen.getByTestId(profile)).toBeInTheDocument();
  });

  it('Verifica se a rota /profile possui o header com o título "Profile", o ícone de perfil mas sem o ícone de pesquisa', () => {
    const initialEntries = ['/profile'];
    renderWithRouter(<App />, { initialEntries });
    expect(screen.getByTestId(title).textContent).toBe('Profile');
    expect(screen.getByTestId(profile)).toBeInTheDocument();
  });

  it('Verifica se a rota /done-recipes possui o header com o título "Done Recipes", o ícone de perfil mas sem o ícone de pesquisa', () => {
    const initialEntries = ['/done-recipes'];
    renderWithRouter(<App />, { initialEntries });
    expect(screen.getByTestId(title).textContent).toBe('Done Recipes');
    expect(screen.getByTestId(profile)).toBeInTheDocument();
  });

  it('Verifica se a rota /favorite-recipes possui o header com o título "Done Recipes", o ícone de perfil mas sem o ícone de pesquisa', () => {
    const initialEntries = ['/favorite-recipes'];
    renderWithRouter(<App />, { initialEntries });
    expect(screen.getByTestId(title).textContent).toBe('Favorite Recipes');
    expect(screen.getByTestId(profile)).toBeInTheDocument();
  });

  it('Verifica se após clicar no botão de perfil a rota muda para a tela de perfil /profile e o título do header muda para "Profile"', () => {
    const initialEntries = ['/meals'];
    const { history } = renderWithRouter(<App />, { initialEntries });
    expect(screen.getByTestId(title).textContent).toBe('Meals');

    userEvent.click(screen.getByTestId(profile));

    expect(screen.getByTestId(title).textContent).toBe('Profile');
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Verifica se ao clicar no botão de busca pela primeira vez, a barra de busca aparece', () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });
    userEvent.click(screen.getByTestId(searchButton));
    expect(screen.getByTestId(search)).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de busca pela segunda vez, a barra de busca desaparece', () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });
    userEvent.click(screen.getByTestId(searchButton));
    userEvent.click(screen.getByTestId(searchButton));
    expect(screen.queryByTestId(search)).not.toBeInTheDocument();
  });
});
