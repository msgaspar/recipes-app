import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';
import CategoryButtons from './CategoryButtons';

import '../styles/RecipesRender.css';

export default function RecipesRender() {
  const {
    recipeData,
    setRecipeData,
    buttonsCategories,
    setButtonsCategories,
  } = useContext(FoodsContext);
  const location = useLocation();
  const sizeCards = 12;
  const FOOD_CARDS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const DRINK_CARDS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const foodsRequest = async () => {
      const response = await fetch(FOOD_CARDS_URL);
      const data = await response.json();
      return data;
    };
    const drinksRequest = async () => {
      const response = await fetch(DRINK_CARDS_URL);
      const data = await response.json();
      return data;
    };
    if (location.pathname === '/comidas') {
      foodsRequest().then((data) => setRecipeData({ meals: data.meals }));
    }
    if (location.pathname === '/bebidas') {
      drinksRequest().then((data) => setRecipeData({ drinks: data.drinks }));
    }
  }, [setRecipeData, location, setButtonsCategories]);

  function handleFoodPage() {
    if (recipeData.meals && buttonsCategories) {
      return (
        <div>
          {recipeData.meals.slice(0, sizeCards).map((recipe, index) => (
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
          ))}
        </div>
      );
    }
  }

  function handleDrinkPage() {
    if (recipeData.drinks && buttonsCategories) {
      return (
        <div>
          {recipeData.drinks.slice(0, sizeCards).map((recipe, index) => (
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
          ))}
        </div>
      );
    }
  }

  return (
    <div className="cards-wrapper">
      <CategoryButtons />
      { location.pathname === '/comidas'
        ? handleFoodPage() : null }
      { location.pathname === '/bebidas'
        ? handleDrinkPage() : null }
    </div>
  );
}
