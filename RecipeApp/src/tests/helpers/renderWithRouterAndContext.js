import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import RecipeProvider from '../../context/RecipeProvider';

function renderWithRouterAndContext(component, path = '/') {
  const history = createMemoryHistory({ initialEntries: [path] });
  return {
    ...render(
      <RecipeProvider>
        <Router history={ history }>
          {component}
        </Router>
      </RecipeProvider>,
    ),
    history,
  };
}

export default renderWithRouterAndContext;
