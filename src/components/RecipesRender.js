import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';

import '../styles/RecipesRender.css';

export default function RecipesRender() {
  const { recipeData } = useContext(FoodsContext);
  const location = useLocation();

  function handleFoodCards() {
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

  function handleDrinkCards() {
    if (recipeData.length > 1) {
      return (
        recipeData.map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="recipe-card-wrapper"
            key={ index }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              className="recipe-card-thumb"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {recipe.strDrink}
            </p>
          </div>
        ))
      );
    }
  }

  return (
    <div className="cards-wrapper">
      { recipeData && location.pathname === '/comidas' ? handleFoodCards() : null }
      { recipeData && location.pathname === '/bebidas' ? handleDrinkCards() : null }
    </div>
  );
}
