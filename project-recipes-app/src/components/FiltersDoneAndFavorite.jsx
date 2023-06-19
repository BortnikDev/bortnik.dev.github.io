import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/FiltersDoneAndFavorites.css';

export default function FiltersDoneAndFavorite({ setState }) {
  const [allRecipes, setAllRecipes] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    const keyStorage = pathname === '/done-recipes' ? 'doneRecipes' : 'favoriteRecipes';
    const recipes = JSON.parse(localStorage.getItem(keyStorage));
    setAllRecipes(recipes);
  }, [pathname]);

  const filterRecipes = (typeRecipe) => {
    if (typeRecipe === 'all') {
      setState(allRecipes);
    } else {
      const filteredRecipes = allRecipes.filter(({ type }) => type === typeRecipe);
      setState(filteredRecipes);
    }
  };
  return (
    <div className="filters-container">
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

FiltersDoneAndFavorite.propTypes = {
  setState: PropTypes.func.isRequired,
};
