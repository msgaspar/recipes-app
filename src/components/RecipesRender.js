import React, { useContext } from 'react';
import FoodsContext from '../context/FoodsContext';

import '../styles/RecipesRender.css';

export default function RecipesRender() {
  const { recipeData } = useContext(FoodsContext);

  function handleCards() {
    if (recipeData.length > 1) {
      return (
        recipeData.map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="recipe-card-wrapper"
            key={ index }
          >
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              className="recipe-card-thumb"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {recipe.strMeal}
            </p>
          </div>
        ))
      );
    }
  }

  return (
    <div className="cards-wrapper">
      { recipeData ? handleCards() : null }
    </div>
  );
}
