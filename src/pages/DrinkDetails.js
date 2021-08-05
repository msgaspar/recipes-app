import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Image, Badge } from 'react-bootstrap';

export default function DrinkDetails() {
  const [drinkDetails, setDrinkDetails] = useState();
  const [drinkItems, setDrinkItems] = useState();
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const DRINK_DETAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const FOOD_RECOMENDATIONS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
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

  function handleStartRecipe() {
    history.push(`/bebidas/${id}/in-progress`);
  }

  useEffect(() => {
    const drinkRequestById = async () => {
      const foodId = location.pathname.split('/')[2];
      const response = await fetch(`${DRINK_DETAILS_URL}${foodId}`);
      const data = await response.json();
      return data.drinks[0];
    };
    const foodRecomendations = async () => {
      const response = await fetch(FOOD_RECOMENDATIONS);
      const data = await response.json();
      return data.drinks;
    };
    drinkRequestById().then((data) => setDrinkDetails(data));
    foodRecomendations();
  });

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
      <p>{ drinkDetails ? drinkDetails.idDrink : ''}</p>
      <Image
        fluid
        src={ drinkDetails ? drinkDetails.strDrinkThumb : null }
        alt="Foto"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drinkDetails ? drinkDetails.strDrink : null }</h1>
      <Button data-testid="share-btn">Compartilhar</Button>
      <Button data-testid="favorite-btn">Favoritar</Button>
      <Badge
        data-testid="recipe-category"
      >
        { drinkDetails ? drinkDetails.strAlcoholic : null}
      </Badge>
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
      <Button
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipe }
      >
        Iniciar Receita

      </Button>
    </div>
  );
}
