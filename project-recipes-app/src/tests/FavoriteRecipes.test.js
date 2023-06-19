import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import { favorites } from './mocks/localStorage';

describe('Verifica se a página Favorite Recipes renderiza as informações corretas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  });

  const nameRecipe1 = '0-horizontal-name';
  const nameRecipe2 = '1-horizontal-name';

  it('Verifica se a página renderiza corretamente as receitas favoritas salvas no localStorage', async () => {
    renderWithRouterAndContext(<App />, '/favorite-recipes');
    await waitFor(() => {
      expect(screen.getByTestId(nameRecipe1).textContent).toBe('Kumpir');
      expect(screen.getByTestId('0-horizontal-top-text').textContent).toBe('Turkish - Side');
      expect(screen.getByTestId(nameRecipe2).textContent).toBe('GG');
      expect(screen.getByTestId('1-horizontal-top-text').textContent).toBe('Optional alcohol');
    });
  });

  it('Verifica se o botão "Meals" é renderizado na tela, e se ao clicar as receitas são filtradas corretamente', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId(nameRecipe1).textContent).toBe('Kumpir');
    expect(screen.queryByTestId(nameRecipe2)).not.toBeInTheDocument();
  });

  it('Verifica se o botão "Drinks" é renderizado na tela, e se ao clicar as receitas são filtradas corretamente', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByTestId(nameRecipe1).textContent).toBe('GG');
    expect(screen.queryByTestId(nameRecipe2)).not.toBeInTheDocument();
  });

  it('Verifica se o botão "All" é renderizado na tela, e se ao clicar as receitas são filtradas corretamente', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getByTestId(nameRecipe1).textContent).toBe('Kumpir');
    expect(screen.getByTestId(nameRecipe2).textContent).toBe('GG');
  });

  it('Verifica se ao clicar no card da receita a aplicação é redirecionada para a página da receita', () => {
    const { history } = renderWithRouterAndContext(<FavoriteRecipes />);
    userEvent.click(screen.getByTestId('0-horizontal-image'));
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52978');
  });

  it('Verifica se ao clicar no botão para desfavoritar a receita ela some da tela', () => {
    renderWithRouterAndContext(<FavoriteRecipes />);
    expect(screen.getByTestId(nameRecipe1).textContent).toBe('Kumpir');
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(2);
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
    expect(screen.getByTestId(nameRecipe1).textContent).toBe('GG');
    expect(screen.queryByTestId(nameRecipe2)).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
  });
});
