import { screen, waitFor } from '@testing-library/react';
// import RecipeDetails from '../pages/RecipeDetails';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockFetch from './mocks/mockFetch';
import { smutDrink, teriyakiChicken } from './mocks/recipesDetails';

describe('Verifica se a página RecipeDetails é renderizada com as informações corretas', () => {
  const mealsRoute = '/meals/52772';
  const drinksRoute = '/drinks/17141';
  const startButton = 'start-recipe-btn';
  const favoriteButton = 'favorite-btn';

  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Verifica se a requisição para a API de bebidas foi realizada na rota /drinks/17141', async () => {
    renderWithRouterAndContext(<App />, drinksRoute);

    act(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17141');
      expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.themealdb.com/api/json/v1/1/search.php?s=');
    });

    await waitFor(() => expect(screen.getByText('Smut')).toBeInTheDocument());
  });

  it('Verifica se a requisição para a API de comidas foi realizada na rota /meals/52772', async () => {
    renderWithRouterAndContext(<App />, mealsRoute);

    act(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(1, 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
      expect(fetch).toHaveBeenNthCalledWith(2, 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    });

    await waitFor(() => expect(screen.getByText('Teriyaki Chicken Casserole')).toBeInTheDocument());
  });

  it('Verifica se a página renderiza todas as informações da receita na rota /meals/52772', async () => {
    renderWithRouterAndContext(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId('recipe-title').textContent).toBe('Teriyaki Chicken Casserole');
      expect(screen.getByTestId('recipe-category').textContent).toBe('Chicken');
      expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg');
      expect(screen.getByTestId('instructions').textContent).toBe(teriyakiChicken.meals[0].strInstructions);
      expect(screen.getByTestId('video')).toBeInTheDocument();
      expect(screen.getByTestId('0-recommendation-title').textContent).toBe('GG');
      expect(screen.getByTestId('1-recommendation-title').textContent).toBe('A1');
    });
  });

  it('Verifica se a página renderiza todas as informações da receita na rota /drinks/17141', async () => {
    renderWithRouterAndContext(<App />, drinksRoute);
    await waitFor(() => {
      expect(screen.getByTestId('recipe-title').textContent).toBe('Smut');
      expect(screen.getByTestId('recipe-category').textContent).toBe('Alcoholic');
      expect(screen.getByTestId('recipe-photo').src).toBe('https://www.thecocktaildb.com/images/media/drink/rx8k8e1504365812.jpg');
      expect(screen.getByTestId('instructions').textContent).toBe(smutDrink.drinks[0].strInstructions);
      expect(screen.queryByTestId('video')).not.toBeInTheDocument();
      expect(screen.getByTestId('0-recommendation-title').textContent).toBe('Corba');
      expect(screen.getByTestId('1-recommendation-title').textContent).toBe('Burek');
    });
  });

  it('Verifica se a página possui o button "Start Recipe" e se ao clicar a rota é redirecionada para "/meals/52772/in-progress"', async () => {
    const { history } = renderWithRouterAndContext(<App />, mealsRoute);
    // const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    await waitFor(() => {
      expect(screen.getByTestId(startButton).textContent).toBe('Start Recipe');
    });
    act(() => userEvent.click(screen.getByTestId(startButton)));
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52772/in-progress');
  });

  it('Verifica se a página possui o button "Start Recipe" e se ao clicar a rota é redirecionada para "/drinks/17141/in-progress"', async () => {
    const { history } = renderWithRouterAndContext(<App />, drinksRoute);

    await waitFor(() => {
      expect(screen.getByTestId(startButton).textContent).toBe('Start Recipe');
    });
    act(() => {
      userEvent.click(screen.getByTestId(startButton));
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/17141/in-progress');
    });
  });

  it('Verifica se a página possui o button "Continue Recipe" se a receita já foi iniciada na rota /drinks', async () => {
    renderWithRouterAndContext(<App />, drinksRoute);
    await waitFor(() => {
      expect(screen.getByTestId(startButton).textContent).toBe('Continue Recipe');
    });
  });

  it('Verifica se a página possui o button "Continue Recipe" se a receita já foi iniciada na rota /meals', async () => {
    renderWithRouterAndContext(<App />, mealsRoute);
    await waitFor(() => {
      expect(screen.getByTestId(startButton).textContent).toBe('Continue Recipe');
    });
  });

  it('Verifica se ao clicar para favoritar uma receita o ícone é alterado e a receita é salva no localStorage', async () => {
    renderWithRouterAndContext(<App />, mealsRoute);
    expect(screen.getByTestId(favoriteButton)).toHaveAttribute('src', 'whiteHeartIcon.svg');
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    act(() => userEvent.click(screen.getByTestId(favoriteButton)));
    expect(screen.getByTestId(favoriteButton)).toHaveAttribute('src', 'blackHeartIcon.svg');
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
  });
});
