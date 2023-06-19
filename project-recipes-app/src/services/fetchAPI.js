export const fetchMeals = async (type, search) => {
  let url = '';
  switch (type) {
  case 'ingredient':
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    break;
  case 'name':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    break;
  case 'first-letter':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    break;
  default:
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinks = async (type, search) => {
  let url = '';
  switch (type) {
  case 'ingredient':
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
    break;
  case 'name':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    break;
  case 'first-letter':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
    break;
  default:
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipes = async (pathname, type, search) => {
  let recipes;
  if (pathname === '/meals') {
    recipes = await fetchMeals(type, search);
  } else {
    recipes = await fetchDrinks(type, search);
  }
  return recipes;
};

const maxNumber = 5;

export const fetchAllCategories = async (endpoint) => {
  try {
    if (endpoint.includes('/meals')) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      return data.meals.slice(0, maxNumber);
    }
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.drinks.slice(0, maxNumber);
  } catch (error) {
    console.log(error);
  }
};

export const fetchMealByCategory = async (category) => {
  let url = '';
  if (category === 'All') {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  } else {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data.meals;
};

export const fetchDrinkByCategory = async (category) => {
  let url = '';
  if (category === 'All') {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data.drinks;
};

export const fetchRecipeByCategory = async (pathname, category) => {
  let recipeByCategory;
  if (pathname === '/meals') {
    recipeByCategory = await fetchMealByCategory(category);
  } else {
    recipeByCategory = await fetchDrinkByCategory(category);
  }
  return recipeByCategory;
};

export const getRecipesId = async (id, endpoint) => {
  try {
    if (endpoint.includes('/meals')) {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const result = await fetch(URL);
      const data = await result.json();
      return (data.meals[0]);
    }
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(URL);
    const data = await result.json();
    return (data.drinks[0]);
  } catch (error) {
    console.log(error);
  }
};
