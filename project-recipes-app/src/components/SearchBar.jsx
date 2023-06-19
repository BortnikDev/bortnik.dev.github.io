import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeContext from '../context/RecipeContext';
import '../css/Header.css';
import { fetchRecipes } from '../services/fetchAPI';

export default function SearchBar() {
  const { setRecipes } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const [typeSearch, setTypeSearch] = useState('ingredient');
  const [search, setSearch] = useState('');
  const history = useHistory();

  const searchRecipe = async () => {
    const recipesList = await fetchRecipes(pathname, typeSearch, search);
    if (typeSearch === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (recipesList && recipesList.length === 1) {
      const enpoint = pathname === '/meals' ? 'idMeal' : 'idDrink';
      history.push(`${pathname}/${recipesList[0][enpoint]}`);
    }
    if (recipesList === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes(recipesList);
  };

  return (
    <div className="search__bar">
      <input
        type="text"
        data-testid="search-input"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
        placeholder="Search for a recipe"
        className="input__search"
      />
      <div className="checkbox__container">
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            name="search"
            type="radio"
            onChange={ ({ target }) => setTypeSearch(target.value) }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            id="name"
            value="name"
            data-testid="name-search-radio"
            name="search"
            type="radio"
            onChange={ ({ target }) => setTypeSearch(target.value) }
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            id="first-letter"
            value="first-letter"
            data-testid="first-letter-search-radio"
            name="search"
            type="radio"
            onChange={ ({ target }) => setTypeSearch(target.value) }
          />
          First letter
        </label>
      </div>

      <button
        data-testid="exec-search-btn"
        onClick={ searchRecipe }
        className="button__search"
      >
        Search
      </button>
    </div>
  );
}
