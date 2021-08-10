import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function StartFoodRecipes() {
  const history = useHistory();
  const { id } = useParams();
  const [doneRecipes, setDoneRecipes] = useState();
  const [recipesInProgress, setRecipesInProgress] = useState();
  const [buttonVisibility, setButtonVisibility] = useState('visible');
  const [buttonText, setButtonText] = useState('Iniciar Receita');

  useEffect(() => {
    const doneFoodRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (doneFoodRecipes) {
      const doneRecipesId = doneFoodRecipes.map((recipe) => recipe.id);
      setDoneRecipes(doneRecipesId);
    }

    if (inProgressRecipes) {
      const inProgressIds = Object.keys(inProgressRecipes.meals);
      setRecipesInProgress(inProgressIds);
    }
  }, []);

  useEffect(() => {
    const buttonStartOptions = {
      false: () => { setButtonVisibility('visible'); setButtonText('Iniciar Receita'); },
      true: () => setButtonVisibility('invisible'),
    };

    const buttonContinueOptions = {
      true: () => {
        setButtonVisibility('visible'); setButtonText('Continuar Receita');
      },
      false: () => null,
    };

    if (doneRecipes) {
      const isRecipeDone = doneRecipes.some((foodId) => foodId === id);
      buttonStartOptions[isRecipeDone]();
    }

    if (recipesInProgress) {
      const isRecipeInProgress = recipesInProgress.some((foodId) => foodId === id);
      buttonContinueOptions[isRecipeInProgress]();
    }
  }, [doneRecipes, recipesInProgress]);

  function handleStartRecipe() {
    history.push(`/comidas/${id}/in-progress`);
  }

  return (
    <div className="start-recipe-wrapper d-grid gap-2">
      <Button
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipe }
        size="lg"
        className={ buttonVisibility }
      >
        { buttonText }
      </Button>
    </div>
  );
}
