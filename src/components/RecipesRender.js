import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';
import CategoryButtons from './CategoryButtons';

import '../styles/RecipesRender.css';

export default function RecipesRender() {
  const {
    recipeData,
    setRecipeData,
    buttonsCategories,
    setButtonsCategories,
    filteredIngredient,
    setFilteredIngredient,
  } = useContext(FoodsContext);
  const location = useLocation();
  const sizeCards = 12;
  const FOOD_CARDS_URL = (filteredIngredient === '') ? 'https://www.themealdb.com/api/json/v1/1/search.php?s=' : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filteredIngredient}`;
  const DRINK_CARDS_URL = (filteredIngredient === '') ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filteredIngredient}`;

  useEffect(() => {
    const foodsRequest = async () => {
      const response = await fetch(FOOD_CARDS_URL);
      const data = await response.json();
      setFilteredIngredient('');
      return data.meals;
    };
    const drinksRequest = async () => {
      const response = await fetch(DRINK_CARDS_URL);
      const data = await response.json();
      setFilteredIngredient('');
      return data.drinks;
    };
    if (location.pathname === '/comidas') {
      foodsRequest().then((data) => setRecipeData([...data]));
    }
    if (location.pathname === '/bebidas') {
      drinksRequest().then((data) => setRecipeData([...data]));
    }
  }, [setRecipeData, location, setButtonsCategories]);

  function handleFoodPage() {
    if (recipeData && buttonsCategories) {
      return (
        <div>
          {console.log(filteredIngredient)}
          {recipeData.slice(0, sizeCards).map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="recipe-card-wrapper"
              key={ index }
              id={ recipe.idMeal }
            >
              <Link to={ `${location.pathname}/${recipe.idMeal}` }>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  className="recipe-card-thumb"
                  data-testid={ `${index}-card-img` }
                />
              </Link>
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
    if (recipeData && buttonsCategories) {
      return (
        <div>
          {recipeData.slice(0, sizeCards).map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              className="recipe-card-wrapper"
              key={ index }
              id={ recipe.idDrink }
            >
              <Link to={ `${location.pathname}/${recipe.idDrink}` }>
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                  className="recipe-card-thumb"
                  data-testid={ `${index}-card-img` }
                />
              </Link>
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
      { location.pathname === '/comidas' ? handleFoodPage() : handleDrinkPage() }
    </div>
  );
}
