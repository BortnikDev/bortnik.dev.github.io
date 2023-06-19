import React, { useEffect, useState } from 'react';
import CardDoneAndFavorite from '../components/CardDoneAndFavorite';
import FiltersDoneAndFavorite from '../components/FiltersDoneAndFavorite';
import Header from '../components/Header';
import '../css/DoneRecipes.css';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes);
  }, []);

  return (
    <div className="done__page">
      <Header />
      <FiltersDoneAndFavorite setState={ setDoneRecipes } />
      { doneRecipes && doneRecipes.map((doneRecipe, index) => (
        <CardDoneAndFavorite recipe={ doneRecipe } indexRecipe={ index } key={ index } />
      ))}
    </div>
  );
}
