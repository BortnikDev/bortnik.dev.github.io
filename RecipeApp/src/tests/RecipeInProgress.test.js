import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockFetch from './mocks/mockFetch';
import { smutDrink, teriyakiChicken } from './mocks/recipesDetails';

describe('Verifica se a página RecipeInProgress é renderizada com as informações corretas', () => {
  const drinksRoute = '/drinks/17141/in-progress';
  const mealsRoute = '/meals/52772/in-progress';
  const finishRecipe = 'finish-recipe-btn';

  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  afterEach(() => jest.resetAllMocks());

  it('Verifica se é renderizada as informações corretas da receita em andamento na rota /drinks', async () => {
    renderWithRouterAndContext(<App />, drinksRoute);
    await waitFor(() => {
      expect(screen.getByTestId('recipe-title').textContent).toBe('Smut');
      expect(screen.getByTestId('recipe-category').textContent).toBe('Alcoholic');
      expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/rx8k8e1504365812.jpg');
      expect(screen.getByTestId('instructions').textContent).toBe(smutDrink.drinks[0].strInstructions);
    });
  });

  it('Verifica se é renderizada as informações corretas da receita em andamento na rota /meals', async () => {
    renderWithRouterAndContext(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId('recipe-title').textContent).toBe('Teriyaki Chicken Casserole');
      expect(screen.getByTestId('recipe-category').textContent).toBe('Chicken');
      expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg');
      expect(screen.getByTestId('instructions').textContent).toBe(teriyakiChicken.meals[0].strInstructions);
      expect(screen.getByTestId('video')).toBeInTheDocument();
    });
  });

  it('Verifica se nenhum ingredient estiver checked o botão está desabilitado, e se ao dar check em todos os ingredientes o botão está habilitado, e ao clicar é redirecionada a rota na página de meals', async () => {
    const { history } = renderWithRouterAndContext(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(finishRecipe)).toBeDisabled();
      const ingredients = screen.getAllByRole('checkbox');
      ingredients.forEach((ingredient) => {
        userEvent.click(ingredient);
      });
      expect(screen.getByTestId(finishRecipe)).toBeEnabled();
    });
    act(() => {
      userEvent.click(screen.getByTestId(finishRecipe));
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
  });

  it('Verifica se nenhum ingredient estiver checked o botão está desabilitado, e se ao dar check em todos os ingredientes o botão está habilitado, e ao clicar é redirecionada a rota na página de drinks', async () => {
    const { history } = renderWithRouterAndContext(<App />, drinksRoute);
    await waitFor(() => {
      expect(screen.getByTestId(finishRecipe)).toBeDisabled();
      const ingredients = screen.getAllByRole('checkbox');
      ingredients.forEach((ingredient) => {
        userEvent.click(ingredient);
      });
      expect(screen.getByTestId(finishRecipe)).toBeEnabled();
    });
    act(() => {
      userEvent.click(screen.getByTestId(finishRecipe));
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
  });
});
