import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SearchBar from './SearchBar';
// import iconMeals from '../css/images/iconMeals.png';
import iconTitleHeader from '../css/images/iconTitleHeader.png';
import ProfileIcon from '../css/images/profile.png';
import SearchIcon from '../css/images/search.png';
import MealIcon from '../css/images/meal.png';
import DrinkIcon from '../css/images/drink.png';
import Search from '../images/searchIcon.svg';
import Profile from '../images/profileIcon.svg';
import '../css/Header.css';

export default function Header() {
  const [showBar, setShowBar] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;
  const pathSearch = path === '/meals' || path === '/drinks';
  let pageTitle = '';

  if (path === '/meals') {
    pageTitle = 'Meals';
  } else if (path === '/drinks') {
    pageTitle = 'Drinks';
  } else if (path === '/profile') {
    pageTitle = 'Profile';
  } else if (path === '/done-recipes') {
    pageTitle = 'Done Recipes';
  } else if (path === '/favorite-recipes') {
    pageTitle = 'Favorite Recipes';
  }

  return (
    <>
      <header>
        <div className="header__title">
          <div className="title_header">
            <img src={ iconTitleHeader } alt="iconTtitle" />
            <h1>Recipes</h1>
          </div>
          <h3 className="subtitle_header">app</h3>
        </div>
        <div className="header__icons">
          <button
            onClick={ () => history.push('/profile') }
            data-testid="profile-top-btn"
            className="header__button"
            src={ Profile }
          >
            <img src={ ProfileIcon } alt="search-icon" />
          </button>
          {pathSearch && (
            <div>
              <button
                onClick={ () => setShowBar(!showBar) }
                className="header__button"
                data-testid="search-top-btn"
                src={ Search }
              >
                <img src={ SearchIcon } alt="search-icon" />
              </button>
            </div>
          )}
        </div>
      </header>
      <section className="header__search">
        <div className="page__title">
          { path === '/meals' && <img src={ MealIcon } alt="meal-icon" /> }
          { path === '/drinks' && <img src={ DrinkIcon } alt="meal-icon" />}
          <h1 data-testid="page-title">{pageTitle}</h1>
        </div>
        { showBar && <SearchBar /> }
      </section>
    </>
  );
}
