import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Image, Button, Badge } from 'react-bootstrap';

export default function FoodDetails() {
  const [foodDetails, setFoodDetails] = useState();
  const [foodItems, setFoodItems] = useState();
  const location = useLocation();
  const FOOD_DETAILS_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const recommendedRecipes = [
    'receita 1',
    'receita 2',
    'receita 3',
  ];

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

  useEffect(() => {
    const foodRequestById = async () => {
      const foodId = location.pathname.split('/')[2];
      const response = await fetch(`${FOOD_DETAILS_URL}${foodId}`);
      const data = await response.json();
      return data.meals[0];
    };
    foodRequestById().then((data) => setFoodDetails(data));
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
      <Image
        fluid
        src={ foodDetails ? foodDetails.strMealThumb : null }
        alt="Foto"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ foodDetails ? foodDetails.strMeal : null }</h1>
      <Button data-testid="share-btn">Compartilhar</Button>
      <Button data-testid="favorite-btn">Favoritar</Button>
      <Badge
        data-testid="recipe-category"
      >
        { foodDetails ? foodDetails.strCategory : null}
      </Badge>
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
        <ul>
          {recommendedRecipes.map((name, index) => (
            <li
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <Button data-testid="start-recipe-btn">
        Iniciar Receita
      </Button>
    </div>
  );
}
