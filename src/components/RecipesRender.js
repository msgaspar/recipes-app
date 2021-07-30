import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';

import '../styles/RecipesRender.css';

export default function RecipesRender() {
  const { recipeData, setRecipeData } = useContext(FoodsContext);
  const location = useLocation();
  const size = 12;
  const FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const foodsRequest = async () => {
      const response = await fetch(FOOD_URL);
      const data = await response.json();
      return data.meals.splice(0, size);
    };
    const drinksRequest = async () => {
      const response = await fetch(DRINK_URL);
      const data = await response.json();
      return data.drinks.splice(0, size);
    };
    if (location.pathname === '/comidas') {
      foodsRequest().then((data) => setRecipeData([...data]));
    }
    if (location.pathname === '/bebidas') {
      drinksRequest().then((data) => setRecipeData([...data]));
    }
  }, [setRecipeData, location]);

  function handleFoodCards() {
    if (recipeData.length > 1) {
      return (
        recipeData.slice(0, size).map((recipe, index) => (
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
        recipeData.slice(0, size).map((recipe, index) => (
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
