import { useContext, useEffect } from 'react';
import {
  useHistory,
  useLocation, useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonShare from '../components/ButtonShare';
import CardRecipeDetails from '../components/CardRecipeDetails';
import RecipeContext from '../context/RecipeContext';
import '../css/RecipeInProgress.css';
import Coffee from '../css/images/doodles/coffee.png';

export default function RecipeInProgress() {
  const { allChecked, recipe } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const date = new Date(Date.now());

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };

    if (pathname.includes('/meals') && !recipes.meals[id]) recipes.meals[id] = [];
    if (pathname.includes('/drinks') && !recipes.drinks[id]) recipes.drinks[id] = [];

    localStorage.setItem('inProgressRecipes', JSON.stringify(recipes));
  }, [pathname, id]);

  const finishRecipe = () => {
    const doneStorage = localStorage.getItem('doneRecipes');
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const receita = {
      id: recipe.idDrink || recipe.idMeal,
      nationality: recipe.strArea || '',
      name: recipe.strDrink || recipe.strMeal,
      category: recipe.strCategory || '',
      image: recipe.strDrinkThumb || recipe.strMealThumb,
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      alcoholicOrNot: recipe.strAlcoholic || '',
      type: pathname.includes('/drinks') ? 'drink' : 'meal',
      doneDate: date.toISOString(),
    };
    if (!doneStorage || !doneStorage.includes(id)) {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipe, receita]));
    }
    history.push('/done-recipes');
  };
  return (
    <div className="in-progress_page">
      <div className="mobile-container">
        <div className="top-btns-container">
          <img src={ Coffee } alt="coffee-icon" className="coffee" />
          <ButtonFavorite />
          <ButtonShare testid="share-btn" />
        </div>
        <CardRecipeDetails />
        <button
          data-testid="finish-recipe-btn"
          disabled={ !allChecked }
          onClick={ finishRecipe }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}
