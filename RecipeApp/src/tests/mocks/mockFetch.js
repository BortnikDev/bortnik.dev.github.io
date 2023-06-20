import allDrinks from './allDrinks';
import allMeals from './allMeals';
import { drinks, meals } from './categories';
import dessertMeals from './dessertMeals';
import { smutDrink, teriyakiChicken } from './recipesDetails';
import shakeDrinks from './shakeDrinks';
// teste

const mockFetch = (url) => {
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(allDrinks),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(allMeals),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') {
    return Promise.resolve({
      json: () => Promise.resolve(dessertMeals),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake') {
    return Promise.resolve({
      json: () => Promise.resolve(shakeDrinks),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
    return Promise.resolve({
      json: () => Promise.resolve(meals),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
    return Promise.resolve({
      json: () => Promise.resolve(drinks),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17141') {
    return Promise.resolve({
      json: () => Promise.resolve(smutDrink),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772') {
    return Promise.resolve({
      json: () => Promise.resolve(teriyakiChicken),
    });
  }
};

export default mockFetch;
