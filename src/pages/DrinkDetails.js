import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Image, Badge } from 'react-bootstrap';

export default function DrinkDetails() {
  const [drinkDetails, setDrinkDetails] = useState();
  const location = useLocation();
  const DRINK_DETAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
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
    const drinkRequestById = async () => {
      const foodId = location.pathname.split('/')[2];
      const response = await fetch(`${DRINK_DETAILS_URL}${foodId}`);
      const data = await response.json();
      return data.drinks[0];
    };
    drinkRequestById().then((data) => setDrinkDetails(data));
  });

  return (
    <div>
      <p>{ drinkDetails ? drinkDetails.idDrink : ''}</p>
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
      <Button data-testid="start-recipe-btn">Iniciar Receita</Button>
    </div>
  );
}
