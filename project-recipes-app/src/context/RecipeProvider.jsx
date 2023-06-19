import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const [listIngredients, setListIngredients] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [recipe, setRecipe] = useState({});

  const value = useMemo(
    () => ({
      recipes,
      setRecipes,
      allRecipes,
      setAllRecipes,
      recomended,
      setRecomended,
      listIngredients,
      setListIngredients,
      allChecked,
      setAllChecked,
      recipe,
      setRecipe,
    }),
    [recipes, allRecipes, recomended, listIngredients,
      allChecked, setAllChecked, recipe],
  );

  return (
    <RecipeContext.Provider value={ value }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
