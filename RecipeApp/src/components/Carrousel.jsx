import React, { useContext } from 'react';
import { Carousel, Card } from 'react-bootstrap';
import RecipeContext from '../context/RecipeContext';

const seven = 7;

export default function Carrousel() {
  const { recomended } = useContext(RecipeContext);
  const filter1 = recomended.filter((_rec, index) => index < seven);

  return (
    <Carousel className="carousel-container">
      { filter1.map((rec, index) => (
        <Carousel.Item key={ index } data-testid={ `${index}-recommendation-card` }>
          <Card>
            <img
              src={ rec.strDrinkThumb || rec.strMealThumb }
              alt={ rec.strDrink || rec.strMeal }
              className="slide-img"
            />
            <h3 data-testid={ `${index}-recommendation-title` }>
              { rec.strDrink || rec.strMeal }
            </h3>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
