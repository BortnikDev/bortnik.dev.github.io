import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ButtonShare({ testid, typeRecipe = '', idRecipe = 0 }) {
  const [copied, setCopied] = useState(false);

  const { pathname } = useLocation();
  const { id } = useParams();

  const copyToClipboard = () => {
    let url = '';
    if (pathname.includes('/meals')) {
      url = `http://localhost:3000/meals/${id}`;
    } else if (pathname.includes('/drinks')) {
      url = `http://localhost:3000/drinks/${id}`;
    } else {
      url = `http://localhost:3000/${typeRecipe}s/${Number(idRecipe)}`;
    }
    copy(url);
    setCopied(true);
  };
  return (
    <div>
      <button
        data-testid={ testid }
        onClick={ copyToClipboard }
        src={ shareIcon }
      >
        <img
          src={ shareIcon }
          alt="share"
        />
      </button>
      { copied && (<span style={ { 'margin-left': '10px' } }>Link copied!</span>) }
    </div>
  );
}

ButtonShare.propTypes = {
  testid: PropTypes.string.isRequired,
  typeRecipe: PropTypes.string,
  idRecipe: PropTypes.string,
};
