import React, { useEffect, useState } from 'react';
import CardDoneAndFavorite from '../components/CardDoneAndFavorite';
import FiltersDoneAndFavorite from '../components/FiltersDoneAndFavorite';
import Header from '../components/Header';
import '../css/FavoriteRecipes.css';
import '../css/CardDoneAndFavorite.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(recipes);
  }, []);

  const disfavorRecipe = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removeRecipe = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeRecipe));
    setFavoriteRecipes(removeRecipe);
  };

  return (
    <div className="favorites__page">
      <Header />
      <FiltersDoneAndFavorite setState={ setFavoriteRecipes } />
      { favoriteRecipes && favoriteRecipes.map((favoriteRecipe, index) => (
        <div key={ index } className="card__done__favorite">
          <CardDoneAndFavorite
            recipe={ favoriteRecipe }
            indexRecipe={ index }
          />
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => disfavorRecipe(favoriteRecipe.id) }
            src={ blackHeartIcon }
          >
            <img
              src={ blackHeartIcon }
              alt="favorite"
            />
          </button>
        </div>
      ))}
    </div>
  );
}
