import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';

import '../styles/RecipesRender.css';

export default function RecipesRender() {
  const { recipeData, setRecipeData } = useContext(FoodsContext);
  const location = useLocation();
  const sizeCards = 12;
  const sizeButtons = 5;
  const FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const mealCategoriesMOCK = {
    meals: [
      { strCategory: 'Beef' },
      { strCategory: 'Breakfast' },
      { strCategory: 'Chicken' },
      { strCategory: 'Dessert' },
      { strCategory: 'Goat' },
      { strCategory: 'Lamb' },
      { strCategory: 'Miscellaneous' },
      { strCategory: 'Pasta' },
      { strCategory: 'Pork' },
      { strCategory: 'Seafood' },
      { strCategory: 'Side' },
      { strCategory: 'Starter' },
      { strCategory: 'Vegan' },
      { strCategory: 'Vegetarian' },
    ],
  };

  useEffect(() => {
    const foodsRequest = async () => {
      const response = await fetch(FOOD_URL);
      const data = await response.json();
      return data.meals.splice(0, sizeCards);
    };
    const drinksRequest = async () => {
      const response = await fetch(DRINK_URL);
      const data = await response.json();
      return data.drinks.splice(0, sizeCards);
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
        recipeData.slice(0, sizeCards).map((recipe, index) => (
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
        recipeData.slice(0, sizeCards).map((recipe, index) => (
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

  function handleCategoriesButton() {
    if (recipeData.length > 1) {
      const recipeCategories = recipeData.map(({ strCategory }) => strCategory);
      const uniqueCategories = [...new Set(recipeCategories)];
      return (
        uniqueCategories.slice(0, sizeButtons).map((category) => (
          <button
            type="button"
            key={ category }
            data-testid={ `${category}-category-filter` }
          >
            { category }
          </button>
        ))
      );
    }
  }

  return (
    <div className="cards-wrapper">
      { recipeData ? handleCategoriesButton() : null }
      { recipeData && location.pathname === '/comidas' ? handleFoodCards() : null }
      { recipeData && location.pathname === '/bebidas' ? handleDrinkCards() : null }
    </div>
  );
}
