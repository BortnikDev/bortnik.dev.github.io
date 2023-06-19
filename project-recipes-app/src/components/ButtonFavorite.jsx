import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeContext from '../context/RecipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function ButtonFavorite() {
  const { recipe } = useContext(RecipeContext);

  const [favorite, setFavorite] = useState(false);

  const { pathname } = useLocation();
  const { id } = useParams();

  const verifyFavorite = useCallback(() => {
    const favoritesStorage = localStorage.getItem('favoriteRecipes');
    if (favoritesStorage && favoritesStorage.includes(id)) {
      setFavorite(true);
    }
  }, [id, setFavorite]);

  useEffect(() => {
    verifyFavorite();
  }, [verifyFavorite]);

  const favoriteRecipe = () => {
    const favoritesStorage = localStorage.getItem('favoriteRecipes');
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const fave = {
      id: recipe.idDrink || recipe.idMeal,
      type: pathname.includes('/drinks') ? 'drink' : 'meal',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strDrink || recipe.strMeal,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
    };
    if (!favoritesStorage || !favoritesStorage.includes(id)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, fave]));
      setFavorite(true);
    } else {
      const removeRecipe = favorites.filter((recipeFav) => recipeFav.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeRecipe));
      setFavorite(false);
    }
  };

  return (
    <div>
      <button
        data-testid="favorite-btn"
        onClick={ favoriteRecipe }
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>
    </div>
  );
}
