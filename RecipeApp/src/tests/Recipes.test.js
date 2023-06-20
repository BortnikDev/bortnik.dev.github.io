import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Recipes from '../pages/Recipes';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockFetch from './mocks/mockFetch';
// import RecipeContext from '../context/RecipeContext';

describe('A aplicação renderiza uma página de receitas', () => {
  const dataTestId1 = '1-card-name';
  const dataTestId2 = '2-card-name';
  const shakeCategory = 'Shake-category-filter';
  const dessertCategory = 'Dessert-category-filter';

  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));

  it('A aplicação renderiza 12 receitas de comida ao carregar /meals', async () => {
    renderWithRouterAndContext(<Recipes />, '/meals');

    expect(screen.getByText('Meals')).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole('heading').length).toBe(14));
  });

  it('A aplicação renderiza 6 categorias de comida ao carregar /meals', async () => {
    renderWithRouterAndContext(<Recipes />, '/meals');

    await waitFor(() => expect(screen.getAllByRole('button').length).toBe(8));
  });

  it('A aplicação renderiza 12 receitas de bebidas ao carregar /drinks', async () => {
    renderWithRouterAndContext(<Recipes />, '/drinks');

    expect(screen.getByText('Drinks')).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole('heading').length).toBe(14));
  });

  it('A aplicação renderiza 6 categorias de bebidas ao carregar /drinks', async () => {
    renderWithRouterAndContext(<Recipes />, '/drinks');

    await waitFor(() => expect(screen.getAllByRole('button').length).toBe(8));
  });

  it('A aplicação renderiza lista de comidas filtrada ao clicar em uma categoria, e renderiza a lista completa ao clicar em All ou a categoria de novo', async () => {
    renderWithRouterAndContext(<Recipes />, '/meals');

    await waitFor(() => expect(screen.getByTestId(dataTestId2)).toHaveTextContent('Sushi'));
    act(() => userEvent.click(screen.getByTestId(dessertCategory)));
    await waitFor(() => expect(screen.getByTestId(dataTestId2)).toHaveTextContent('Apple Frangipan Tart'));

    act(() => userEvent.click(screen.getByTestId('All-category-filter')));
    await waitFor(() => expect(screen.getByTestId(dataTestId2)).toHaveTextContent('Sushi'));

    act(() => userEvent.click(screen.getByTestId(dessertCategory)));
    act(() => userEvent.click(screen.getByTestId(dessertCategory)));
    await waitFor(() => expect(screen.getByTestId(dataTestId2)).toHaveTextContent('Sushi'));
  });

  it('A aplicação renderiza lista de bebidas filtrada ao clicar em uma categoria, e renderiza a lista completa ao clicar em All ou a categoria de novo', async () => {
    renderWithRouterAndContext(<Recipes />, '/drinks');

    await waitFor(() => expect(screen.getByTestId(dataTestId1)).toHaveTextContent('A1'));
    act(() => userEvent.click(screen.getByTestId(shakeCategory)));
    await waitFor(() => expect(screen.getByTestId(dataTestId1)).toHaveTextContent('Avalanche'));

    act(() => userEvent.click(screen.getByTestId('All-category-filter')));
    await waitFor(() => expect(screen.getByTestId(dataTestId1)).toHaveTextContent('A1'));

    act(() => userEvent.click(screen.getByTestId(shakeCategory)));
    act(() => userEvent.click(screen.getByTestId(shakeCategory)));
    await waitFor(() => expect(screen.getByTestId(dataTestId1)).toHaveTextContent('A1'));
  });
});
