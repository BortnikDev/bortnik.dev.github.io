import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Verifica se o footer renderiza as informações corretas', () => {
  const footer = 'footer';
  const drinksFooter = 'drinks-bottom-btn';
  const mealsFooter = 'meals-bottom-btn';

  it('Verifica se o footer é exibido na rota /meals e ao clicar no ícone de drinks a aplicação é redirecionada para a rota /drinks', () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks');

    expect(screen.getByTestId(footer)).toBeInTheDocument();
    expect(screen.getByTestId(drinksFooter)).toBeInTheDocument();
    expect(screen.getByTestId(mealsFooter)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(mealsFooter));

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });

  it('Verifica se o footer é exibido na rota /drinks e ao clicar no ícone de meals a aplicação é redirecionada para a rota /meals', () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    expect(screen.getByTestId(footer)).toBeInTheDocument();
    expect(screen.getByTestId(drinksFooter)).toBeInTheDocument();
    expect(screen.getByTestId(mealsFooter)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(drinksFooter));

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Verifica se o footer é exibido na rota /profile e se ao clicar nos ícones a aplicação é redirecionada para as rotas corretas', () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    expect(screen.getByTestId(footer)).toBeInTheDocument();
    expect(screen.getByTestId(drinksFooter)).toBeInTheDocument();
    expect(screen.getByTestId(mealsFooter)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(drinksFooter));

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});
