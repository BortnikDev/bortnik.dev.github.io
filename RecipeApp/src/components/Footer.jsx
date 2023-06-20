import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer-container">
      <div className="footer-label">
        <button
          data-testid="meals-bottom-btn"
          className="material-symbols-outlined footer-icon"
          onClick={ () => history.push('/meals') }
          src={ mealIcon }
        >
          restaurant
          <span className="footer-text">Meals</span>
        </button>
      </div>
      <div className="footer-label">
        <button
          data-testid="drinks-bottom-btn"
          className="material-symbols-outlined footer-icon"
          onClick={ () => history.push('/drinks') }
          src={ drinkIcon }
        >
          local_bar
          <span className="footer-text">Drinks</span>
        </button>
      </div>
    </footer>
  );
}
