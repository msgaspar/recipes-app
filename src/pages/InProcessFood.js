import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getFoodRecipeDetails } from '../services/getRecipeDetails';
import RecipeHeader from '../components/RecipeHeader';
import IngredientsCheckList from '../components/IngredientsCheckList';
import FinishFoodRecipe from '../components/FinishFoodRecipe';

export default function InProcessFood() {
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
    getFoodRecipeDetails(id)
      .then((data) => setRecipeData(data));
  }, [id]);

  return (
    <Container>
      <RecipeHeader
        name={ recipeData && recipeData.strMeal }
        type="comida"
        area={ recipeData && recipeData.strArea }
        imgUrl={ recipeData && recipeData.strMealThumb }
        category={ recipeData && recipeData.strCategory }
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
          Aqui as instruções de como fazer essa receitinha maravilhosa
        </p>
      </div>
      <FinishFoodRecipe
        checkIngredients={ allIngredientsChecked }
        recipeData={ recipeData }
      />
    </Container>
  );
}
