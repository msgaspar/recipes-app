import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FoodRecommends from '../components/FoodRecommends';
import RecipeHeader from '../components/RecipeHeader';

import '../styles/StartRecipe.css';
import StartDrinkRecipes from '../components/StartDrinkRecipes';

export default function DrinkDetails() {
  const [drinkDetails, setDrinkDetails] = useState();
  const [drinkItems, setDrinkItems] = useState();
  const [foodsRecommends, setFoodsRecommends] = useState();
  const location = useLocation();
  const DRINK_DETAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const FOOD_RECOMMENDS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  function validateIfIngredient(array) {
    if (array[0].includes('strIngredient') && array[1] !== '') {
      return array[1];
    }
  }

  function validateIfMeasure(array) {
    if (array[0].includes('strMeasure') && array[1] !== '') {
      return array[1];
    }
  }

  function handleIngredients() {
    const entriesFromDrinkDetails = Object.entries(drinkDetails);
    const possibleIngredients = entriesFromDrinkDetails
      .map((array) => validateIfIngredient(array));
    const arrayOfIngredients = possibleIngredients.filter((ingredient) => ingredient);
    return arrayOfIngredients;
  }

  function handleMeasures() {
    const entriesFromDrinkDetails = Object.entries(drinkDetails);
    const possibleIngredients = entriesFromDrinkDetails
      .map((array) => validateIfMeasure(array));
    const arrayOfMeasures = possibleIngredients.filter((ingredient) => ingredient);
    return arrayOfMeasures;
  }

  function ingredientsInformation() {
    return drinkItems
      .map((ingredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { ingredient }
        </li>));
  }

  useEffect(() => {
    const drinkRequestById = async () => {
      const foodId = location.pathname.split('/')[2];
      const response = await fetch(`${DRINK_DETAILS_URL}${foodId}`);
      const data = await response.json();
      return data.drinks[0];
    };

    const foodRecommends = async () => {
      const response = await fetch(FOOD_RECOMMENDS);
      const data = await response.json();
      return data.meals;
    };
    drinkRequestById().then((data) => setDrinkDetails(data));
    foodRecommends().then((data) => setFoodsRecommends(data));
  }, [setDrinkDetails, location.pathname]);

  useEffect(() => {
    const handleRecipeInformation = () => {
      const arrayOfIngredients = handleIngredients();
      const arrayOfMeasures = handleMeasures();
      const ingredientsAndMeasures = arrayOfIngredients
        .map((ingredient, index) => `${ingredient} - ${arrayOfMeasures[index]}`);
      setDrinkItems(ingredientsAndMeasures);
    };

    if (drinkDetails) {
      handleRecipeInformation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinkDetails]);

  return (
    <div>
      <RecipeHeader
        alcoholicOrNot={ drinkDetails && drinkDetails.strAlcoholic }
        imgUrl={ drinkDetails && drinkDetails.strDrinkThumb }
        name={ drinkDetails && drinkDetails.strDrink }
        category={ drinkDetails && drinkDetails.strCategory }
        type="bebida"
      />
      <div>
        <h3>Ingredients</h3>
        <ul>
          { drinkItems ? ingredientsInformation() : null }
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          { drinkDetails ? drinkDetails.strInstructions : null }
        </p>
      </div>
      <div>
        <h3>Receitas recomendadas</h3>
        <FoodRecommends recommends={ foodsRecommends } />
      </div>
      <StartDrinkRecipes />
    </div>
  );
}
