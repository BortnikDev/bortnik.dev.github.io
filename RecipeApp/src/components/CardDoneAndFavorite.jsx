import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/CardDoneAndFavorite.css';
import ButtonShare from './ButtonShare';

export default function CardDoneAndFavorite({ indexRecipe, recipe }) {
  const { name, category, doneDate, image, tags,
    type, nationality, id, alcoholicOrNot } = recipe;
  const { pathname } = useLocation();

  return (
    <div className={ pathname === '/done-recipes' ? 'card__done__favorite' : '' }>
      <Link to={ `/${type}s/${Number(id)}` }>
        <img
          src={ image }
          alt={ image }
          className="card__img"
          data-testid={ `${indexRecipe}-horizontal-image` }
        />
        <h2
          data-testid={ `${indexRecipe}-horizontal-name` }
        >
          { name }
        </h2>
      </Link>
      <h3
        data-testid={ `${indexRecipe}-horizontal-top-text` }
      >
        { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
      </h3>
      { pathname === '/done-recipes' && (
        <>
          <h3 data-testid={ `${indexRecipe}-horizontal-done-date` }>{ doneDate }</h3>
          <div>
            { tags.map((tag) => (
              <button
                data-testid={ `${indexRecipe}-${tag}-horizontal-tag` }
                key={ tag }
              >
                { tag }
              </button>
            ))}
          </div>
        </>
      )}
      <ButtonShare
        testid={ `${indexRecipe}-horizontal-share-btn` }
        typeRecipe={ type }
        idRecipe={ id }
      />
    </div>
  );
}

CardDoneAndFavorite.propTypes = {
  indexRecipe: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    nationality: PropTypes.string,
    id: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
};
