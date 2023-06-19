import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeContext from '../context/RecipeContext';
import '../css/CardRecipeDetails.css';

export default function IngredientCheckbox({ ingrediente, index }) {
  const { listIngredients, setAllChecked } = useContext(RecipeContext);
  const { id } = useParams();
  const { pathname } = useLocation();

  const [checkedOrNot, setCheckedOrNot] = useState(false);

  const verifyChecked = useCallback(() => {
    const recipes = localStorage.getItem('inProgressRecipes') || '';
    const verifyButton = listIngredients && listIngredients
      .every((ingredient) => recipes.includes(ingredient));
    setAllChecked(verifyButton);
    const verifyIngredients = recipes && recipes.includes(ingrediente);
    setCheckedOrNot(verifyIngredients);
  }, [ingrediente, listIngredients, setAllChecked]);

  const checkIngredient = (target) => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const allIngredients = pathname.includes('/meals')
      ? recipes.meals[id] : recipes.drinks[id];
    let checkedIngredients;
    if (target.checked) {
      checkedIngredients = [...allIngredients, target.value];
    } else {
      checkedIngredients = allIngredients
        .filter((ingredient) => ingredient !== target.value);
    }

    if (pathname.includes('/meals')) recipes.meals[id] = checkedIngredients;
    if (pathname.includes('/drinks')) recipes.drinks[id] = checkedIngredients;

    localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
  };

  useEffect(() => {
    verifyChecked();
  }, [verifyChecked]);

  return (
    <label
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ `ingredient-list-${index}` }
      key={ index }
      id="label-checkbox"
      className={ checkedOrNot ? 'crossed' : '' }
    >
      <input
        type="checkbox"
        id={ `ingredient-list-${index}` }
        value={ ingrediente }
        onClick={ ({ target }) => checkIngredient(target) }
        onChange={ verifyChecked }
        checked={ checkedOrNot }
        className="progress-checkbox"
      />
      { ingrediente }
    </label>
  );
}

IngredientCheckbox.propTypes = {
  index: PropTypes.number.isRequired,
  ingrediente: PropTypes.string.isRequired,
};
