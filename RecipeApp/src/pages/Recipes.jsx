import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CardRecipe from '../components/CardRecipe';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import '../css/Recipes.css';
import {
  fetchAllCategories, fetchRecipeByCategory, fetchRecipes,
} from '../services/fetchAPI';

export default function Recipes() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { pathname } = useLocation();
  const { recipes, setRecipes, allRecipes, setAllRecipes } = useContext(RecipeContext);

  const getRecipes = useCallback(async () => {
    const recipesList = await fetchRecipes(pathname);
    setRecipes(recipesList);
    setAllRecipes(recipesList);
  }, [pathname, setAllRecipes, setRecipes]);

  const fetchCategories = useCallback(async () => {
    const allCategories = await fetchAllCategories(pathname);
    setCategories([{ strCategory: 'All' }, ...allCategories]);
  }, [pathname]);

  useEffect(() => {
    getRecipes();
    fetchCategories();
  }, [getRecipes, fetchCategories]);

  const filterByCategory = async (category) => {
    setSelectedCategory(category);
    const filterRecipeCategory = await fetchRecipeByCategory(pathname, category);
    const filter = selectedCategory === category ? allRecipes : filterRecipeCategory;
    setRecipes(filter);
  };

  const maxNumber = 12;
  const listRecipes = recipes && recipes.slice(0, maxNumber);

  return (
    <div className="recipes__page">
      <Header />
      <div className="category-container">
        {categories.map(({ strCategory }, index) => (
          <button
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => filterByCategory(strCategory) }
            className="category_button"
          >
            { strCategory }
          </button>
        ))}
      </div>
      <div className="card-container">
        { listRecipes && listRecipes.map((recipe, index) => (
          <Link
            key={ index }
            to={ pathname === '/meals'
              ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}` }
            className="recipe-link"
          >
            <CardRecipe
              name={ recipe.strMeal || recipe.strDrink }
              url={ recipe.strMealThumb || recipe.strDrinkThumb }
              index={ index }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
