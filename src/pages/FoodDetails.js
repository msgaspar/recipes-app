import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkRecommends from '../components/DrinkRecommends';
import RecipeHeader from '../components/RecipeHeader';

import '../styles/StartRecipe.css';
import StartFoodRecipes from '../components/StartFoodRecipes';

export default function FoodDetails() {
  const [foodDetails, setFoodDetails] = useState();
  const [foodItems, setFoodItems] = useState();
  const [drinksRecommends, setDrinksRecommends] = useState();
  const location = useLocation();
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

  function handleYouTubeEmbed() {
    const youtubeHash = foodDetails.strYoutube.split('=')[1];
    const urlToEmbed = 'https://www.youtube.com/embed/';
    const embedYoutubeHash = `${urlToEmbed}${youtubeHash}`;

    return embedYoutubeHash;
  }

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
        category={ foodDetails && foodDetails.strCategory }
        imgUrl={ foodDetails && foodDetails.strMealThumb }
        name={ foodDetails && foodDetails.strMeal }
        type="comida"
        area={ foodDetails && foodDetails.strArea }
      />
      <div
        className="px-4"
        style={ {
          maxWidth: '500px',
        } }
      >
        <h3
          style={ {
            color: '#343a40',
            fontWeight: 'bold',
          } }
        >
          Ingredients
        </h3>
        <ul className="bg-light w-100">
          { foodItems ? ingredientsInformation() : null }
        </ul>
      </div>
      <div
        className="px-4"
        style={ {
          maxWidth: '500px',
        } }
      >
        <h3
          style={ {
            color: '#343a40',
            fontWeight: 'bold',
          } }
        >
          Instructions
        </h3>
        <p
          data-testid="instructions"
        >
          { foodDetails ? foodDetails.strInstructions : null }
        </p>
      </div>
      <iframe
        src={ foodDetails ? handleYouTubeEmbed() : null }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid="video"
        className="px-4"
        style={ {
          maxWidth: '500px',
          height: '300px',
        } }
      />
      <div
        className="px-4"
        style={ {
          maxWidth: '500px',
        } }
      >
        <h3
          style={ {
            color: '#343a40',
            fontWeight: 'bold',
          } }
        >
          Receitas recomendadas
        </h3>
        <DrinkRecommends recommends={ drinksRecommends } />
      </div>
      <StartFoodRecipes />
    </div>
  );
}
