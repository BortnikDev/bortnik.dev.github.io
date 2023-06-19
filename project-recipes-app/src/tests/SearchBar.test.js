import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SearchBar from '../components/SearchBar';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import { firstLetterN, ingredientOrange, nameBeer, nameWater } from './mocks/mockDrinks';
import { firtLetterA, ingredientBread, namePizza } from './mocks/mockMeals';

// Componente SearchBar

describe('Verifica se o componente SearchBar possui os elementos da barra de busca de receitas da aplicação', () => {
  const execSearchBtn = 'exec-search-btn';
  const search = 'search-input';
  const ingredientInput = 'ingredient-search-radio';
  const nameInput = 'name-search-radio';
  const firstLetterInput = 'first-letter-search-radio';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Verifica se o compoente possui um elemento radio button para a busca de ingrediente', () => {
    renderWithRouterAndContext(<SearchBar />);
    expect(screen.getByTestId(ingredientInput)).toBeInTheDocument();
    expect(screen.getByText(/ingredient/i)).toBeInTheDocument();
  });

  it('Verifica se o compoente possui um elemento radio button para a busca de nome da receita', () => {
    renderWithRouterAndContext(<SearchBar />);
    expect(screen.getByTestId(nameInput)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
  });

  it('Verifica se o compoente possui um elemento radio button para a busca de primeira letra da receita', () => {
    renderWithRouterAndContext(<SearchBar />);
    expect(screen.getByTestId(firstLetterInput)).toBeInTheDocument();
    expect(screen.getByText(/first letter/i)).toBeInTheDocument();
  });

  it('Verifica se o compoente possui um botão de busca', () => {
    renderWithRouterAndContext(<SearchBar />);
    expect(screen.getByTestId(execSearchBtn)).toBeInTheDocument();
    expect(screen.getByTestId(execSearchBtn).textContent).toBe('Search');
  });

  it('Verifica se o radio selecionado for Ingredient na rota /meals, a busca na API é feita corretamente pelo ingrediente', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientBread),
    });

    renderWithRouterAndContext(<SearchBar />, '/meals');

    const ingredient = 'bread';
    act(() => {
      // digita o ingrediente a ser procurado
      userEvent.type(screen.getByTestId(search), ingredient);
      // clica no input de ingrediente
      userEvent.click(screen.getByTestId(ingredientInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  });

  it('Verifica se o radio selecionado for Name na rota /meals, a busca na API é feita corretamente pelo nome', () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(namePizza),
      });

      renderWithRouterAndContext(<SearchBar />, '/meals');
    });

    const name = 'pizza';
    act(() => {
      // digita o ingrediente a ser procurado
      userEvent.type(screen.getByTestId(search), name);
      // clica no input de name
      userEvent.click(screen.getByTestId(nameInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  });

  it('Verifica se o radio selecionado for First Letter na rota /meals, a busca na API é feita corretamente pela primeira letra', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(firtLetterA),
    });

    renderWithRouterAndContext(<SearchBar />, '/meals');

    const firstLetter = 'a';
    act(() => {
      // digia a primeira letra a ser procurada
      userEvent.type(screen.getByTestId(search), firstLetter);
      // clica no input de first-letter
      userEvent.click(screen.getByTestId(firstLetterInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  });

  it('Verifica se o radio selecionado for Ingredient na rota /drinks, a busca na API é feita corretamente pelo ingrediente', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientOrange),
    });

    renderWithRouterAndContext(<SearchBar />, '/drinks');

    const ingredient = 'orange';
    act(() => {
      // digia o ingrediente a ser procurado
      userEvent.type(screen.getByTestId(search), ingredient);
      // clica no input de ingrediente
      userEvent.click(screen.getByTestId(ingredientInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  });

  it('Verifica se o radio selecionado for Name na rota /drinks, a busca na API é feita corretamente pelo nome da receita', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(nameBeer),
    });

    renderWithRouterAndContext(<SearchBar />, '/drinks');

    const name = 'beer';
    act(() => {
      // digia o ingrediente a ser procurado
      userEvent.type(screen.getByTestId(search), name);
      // clica no input de name
      userEvent.click(screen.getByTestId(nameInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  });

  it('Verifica se o radio selecionado for First Letter na rota /drinks, a busca na API é feita corretamente pela primeira letra', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(firstLetterN),
    });

    renderWithRouterAndContext(<SearchBar />, '/drinks');

    const firstLetter = 'n';
    act(() => {
      // digia a primeira letra a ser procurada
      userEvent.type(screen.getByTestId(search), firstLetter);
      // clica no input de first-letter
      userEvent.click(screen.getByTestId(firstLetterInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  });

  it('Verifica se caso seja encontrada apenas uma comida a aplicação é redirecionada para a rota de detalhes partindo da rota meals', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(namePizza),
    });

    const { history } = renderWithRouterAndContext(<SearchBar />, '/meals');

    const name = 'pizza';
    act(() => {
      // digita o ingrediente a ser procurado
      userEvent.type(screen.getByTestId(search), name);
      // clica no input de name
      userEvent.click(screen.getByTestId(nameInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/53014');
    });
  });

  it('Verifica se caso seja encontrada apenas uma comida a aplicação é redirecionada para a rota de detalhes partindo da rota drinks', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(nameWater),
    });

    const { history } = renderWithRouterAndContext(<SearchBar />, '/drinks');

    const name = 'water';
    act(() => {
      // digita o ingrediente a ser procurado
      userEvent.type(screen.getByTestId(search), name);
      // clica no input de name
      userEvent.click(screen.getByTestId(nameInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178332');
    });
  });

  it('Verifica se ao realizar a busca na API com mais de uma letra, é exibir um alert om a mensagem "Your search must have only 1 (one) character"', async () => {
    renderWithRouterAndContext(<SearchBar />);

    const alertMock = jest.spyOn(global, 'alert');

    const firstLetter = 'aa';
    act(() => {
      // digia a primeira letra a ser procurada
      userEvent.type(screen.getByTestId(search), firstLetter);
      // clica no input de first-letter
      userEvent.click(screen.getByTestId(firstLetterInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
  });

  it('Verifica se caso nenhuma receita seja encontrada é exibido um alert com o texto "Sorry, we havent found any recipes for these filters" na página meals', async () => {
    renderWithRouterAndContext(<SearchBar />, '/meals');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null }),
    });

    const alertMock = jest.spyOn(global, 'alert');

    const name = 'xablau';
    act(() => {
      // digita um name a ser procurado
      userEvent.type(screen.getByTestId(search), name);
      // clica no input de name
      userEvent.click(screen.getByTestId(nameInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
  });

  it('Verifica se caso nenhuma receita seja encontrada é exibido um alert com o texto "Sorry, we havent found any recipes for these filters" na página drinks', async () => {
    renderWithRouterAndContext(<SearchBar />, '/drinks');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });

    const alertMock = jest.spyOn(global, 'alert');

    const name = 'xablau';
    act(() => {
      // digita um name a ser procurado
      userEvent.type(screen.getByTestId(search), name);
      // clica no input de name
      userEvent.click(screen.getByTestId(nameInput));
      // clica no botão para pesquisar e fazer a requisição
      userEvent.click(screen.getByTestId(execSearchBtn));
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
  });
});
