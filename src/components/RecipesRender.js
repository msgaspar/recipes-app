import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';
import CategoryButtons from './CategoryButtons';
import RecipeCard from './RecipeCard';

export default function RecipesRender() {
  const {
    recipeData,
    setRecipeData,
    buttonsCategories,
    setButtonsCategories,
  } = useContext(FoodsContext);
  const history = useHistory();
  const location = useLocation();
  const sizeCards = 12;
  const FOOD_CARDS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const DRINK_CARDS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const foodsRequest = async () => {
      const response = await fetch(FOOD_CARDS_URL);
      const data = await response.json();
      return data.meals;
    };
    const drinksRequest = async () => {
      const response = await fetch(DRINK_CARDS_URL);
      const data = await response.json();
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
      return recipeData.slice(0, sizeCards).map((recipe, index) => (
        <RecipeCard
          key={ index }
          recipeId={ recipe.idMeal }
          imgUrl={ recipe.strMealThumb }
          index={ index }
          recipeName={ recipe.strMeal }
          onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
        />
      ));
    }
  }

  function handleDrinkPage() {
    if (recipeData && buttonsCategories) {
      return recipeData.slice(0, sizeCards).map((recipe, index) => (
        <RecipeCard
          data-testid={ `${index}-recipe-card` }
          key={ index }
          recipeId={ recipe.idDrink }
          imgUrl={ recipe.strDrinkThumb }
          index={ index }
          recipeName={ recipe.strDrink }
          onClick={ () => history.push(`/bebidas/${recipe.idDrink}`) }
        />
      ));
    }
  }

  return (
    <div
      className="d-flex flex-column"
      style={ {
        paddingTop: '80px',
        paddingBottom: '70px',
      } }
    >
      <CategoryButtons />
      <div
        className="px-4 mx-auto"
        style={ {
          maxWidth: '500px',
        } }
      >
        { location.pathname === '/comidas' ? handleFoodPage() : handleDrinkPage() }
      </div>
    </div>
  );
}
