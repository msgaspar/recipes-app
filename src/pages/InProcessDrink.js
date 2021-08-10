import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getDrinkRecipeDetails } from '../services/getRecipeDetails';
import RecipeHeader from '../components/RecipeHeader';
import IngredientsCheckList from '../components/IngredientsCheckList';
import FinishDrinkRecipe from '../components/FinishDrinkRecipe';

export default function InProcessDrink() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

  const ingredients = [];
  if (recipeData) {
    Object.entries(recipeData).forEach(
      (entry) => {
        const [key, value] = entry;
        if (key.includes('strIngredient') && value) {
          ingredients.push(value);
        }
      },
    );
  }

  useEffect(() => {
    getDrinkRecipeDetails(id)
      .then((data) => setRecipeData(data));
  }, [id]);

  return (
    <Container>
      <RecipeHeader
        alcoholicOrNot={ recipeData && recipeData.strAlcoholic }
        imgUrl={ recipeData && recipeData.strDrinkThumb }
        name={ recipeData && recipeData.strDrink }
        category={ recipeData && recipeData.strCategory }
        type="bebida"
      />
      <IngredientsCheckList
        ingredients={ ingredients }
        setAllIngredientsChecked={ setAllIngredientsChecked }
      />
      <div>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
          className="mt-3 ml-3"
        >
          {recipeData ? recipeData.strInstructions : ''}
        </p>
      </div>
      <FinishDrinkRecipe
        checkIngredients={ allIngredientsChecked }
        recipeData={ recipeData }
      />
    </Container>
  );
}
