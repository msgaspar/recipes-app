import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function StartDrinkRecipes() {
  const history = useHistory();
  const { id } = useParams();
  const [doneRecipes, setDoneRecipes] = useState();
  const [recipesInProgress, setRecipesInProgress] = useState();
  const [recipeStatus, setRecipeStatus] = useState('pending');

  useEffect(() => {
    const doneFoodRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (doneFoodRecipes) {
      const doneRecipesId = doneFoodRecipes.map((recipe) => recipe.id);
      setDoneRecipes(doneRecipesId);
    }

    if (inProgressRecipes) {
      const inProgressIds = Object.keys(inProgressRecipes.cocktails);
      setRecipesInProgress(inProgressIds);
    }
  }, []);

  function handleStartRecipe() {
    history.push(`/bebidas/${id}/in-progress`);
  }

  if (recipeStatus === 'pending') {
    return (
      <div className="start-recipe-wrapper d-grid gap-2">
        <Button
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipe }
          size="lg"
        >
          Iniciar Receita
        </Button>
      </div>
    );
  }

  if (recipeStatus === 'done') {
    return null;
  }

  if (recipeStatus === 'doing') {
    return (
      <div className="start-recipe-wrapper d-grid gap-2">
        <Button
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipe }
          size="lg"
        >
          Continuar Receita
        </Button>
      </div>
    );
  }
}
