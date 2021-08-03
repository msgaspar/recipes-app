import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Image, Button, Badge } from 'react-bootstrap';

export default function FoodDetails() {
  const [foodDetails, setFoodDetails] = useState();
  const location = useLocation();
  const FOOD_DETAILS_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const ingredients = [
    'white flour',
    'salt',
    'yeast',
    'butter',
  ];

  const recommendedRecipes = [
    'receita 1',
    'receita 2',
    'receita 3',
  ];

  useEffect(() => {
    const foodRequestById = async () => {
      const foodId = location.pathname.split('/')[2];
      const response = await fetch(`${FOOD_DETAILS_URL}${foodId}`);
      const data = await response.json();
      return data.meals[0];
    };
    foodRequestById().then((data) => setFoodDetails(data));
  });

  return (
    <div>
      <p>{foodDetails ? foodDetails.idMeal : ''}</p>
      <Image
        fluid
        src="https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg"
        alt="Foto"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">Nome da receita</h1>
      <Button data-testid="share-btn">Compartilhar</Button>
      <Button data-testid="favorite-btn">Favoritar</Button>
      <Badge data-testid="recipe-category">Categoria</Badge>

      <div>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((name, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          Aqui as instruções de como fazer essa receitinha maravilhosa
        </p>
      </div>
      <iframe
        src="https://www.youtube.com/embed/DsFpGUXpZVU"
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
