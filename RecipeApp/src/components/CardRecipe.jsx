import PropTypes from 'prop-types';
import React from 'react';
import '../css/CardRecipe.css';
import Tape from '../css/images/tape2.png';

export default function CardRecipe({ url, name, index }) {
  return (
    <div className="card" data-testid={ `${index}-recipe-card` }>
      <img src={ Tape } alt="tape" className="recipe-tape" />
      <img
        className="card-img"
        data-testid={ `${index}-card-img` }
        src={ url }
        alt={ name }
      />
      <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
    </div>
  );
}

CardRecipe.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
