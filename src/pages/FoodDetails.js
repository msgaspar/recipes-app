import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DrinkRecommends from '../components/DrinkRecommends';
import RecipeHeader from '../components/RecipeHeader';

export default function FoodDetails() {
  const [foodDetails, setFoodDetails] = useState();
  const [foodItems, setFoodItems] = useState();
  const [drinksRecommends, setDrinksRecommends] = useState();
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const FOOD_DETAILS_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const DRINK_RECOMMENDS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

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
    const entriesFromFoodDetails = Object.entries(foodDetails);
    const possibleIngredients = entriesFromFoodDetails
      .map((array) => validateIfIngredient(array));
    const arrayOfIngredients = possibleIngredients.filter((ingredient) => ingredient);
    return arrayOfIngredients;
  }

  function handleMeasures() {
    const entriesFromFoodDetails = Object.entries(foodDetails);
    const possibleIngredients = entriesFromFoodDetails
      .map((array) => validateIfMeasure(array));
    const arrayOfMeasures = possibleIngredients.filter((ingredient) => ingredient);
    return arrayOfMeasures;
  }

  function ingredientsInformation() {
    return foodItems
      .map((ingredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { ingredient }
        </li>));
  }

  function handleStartRecipe() {
    history.push(`/comidas/${id}/in-progress`);
  }

  useEffect(() => {
    const foodRequestById = async () => {
      const foodId = location.pathname.split('/')[2];
      const response = await fetch(`${FOOD_DETAILS_URL}${foodId}`);
      const data = await response.json();
      return data.meals[0];
    };
    const drinkRecommends = async () => {
      const response = await fetch(DRINK_RECOMMENDS);
      const data = await response.json();
      return data.drinks;
    };
    foodRequestById().then((data) => setFoodDetails(data));
    drinkRecommends().then((data) => setDrinksRecommends(data));
  }, [setFoodDetails, location.pathname]);

  useEffect(() => {
    const handleRecipeInformation = () => {
      const arrayOfIngredients = handleIngredients();
      const arrayOfMeasures = handleMeasures();
      const ingredientsAndMeasures = arrayOfIngredients
        .map((ingredient, index) => `${ingredient} - ${arrayOfMeasures[index]}`);
      setFoodItems(ingredientsAndMeasures);
    };

    if (foodDetails) {
      handleRecipeInformation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodDetails]);

  return (
    <div>
      <RecipeHeader
        category={ foodDetails ? foodDetails.strCategory : null }
        imgUrl={ foodDetails ? foodDetails.strMealThumb : null }
        title={ foodDetails ? foodDetails.strMeal : null }
      />
      <div>
        <h3>Ingredients</h3>
        <ul>
          { foodItems ? ingredientsInformation() : null }
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          { foodDetails ? foodDetails.strInstructions : null }
        </p>
      </div>
      <iframe
        src={ foodDetails ? foodDetails.strYoutube : null }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid="video"
      />
      <div>
        <h3>Receitas recomendadas</h3>
        <DrinkRecommends recommends={ drinksRecommends } />
      </div>
      <Button
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipe }
      >
        Iniciar Receita
      </Button>
    </div>
  );
}
