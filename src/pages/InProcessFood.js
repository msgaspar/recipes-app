import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { getFoodRecipeDetails } from '../services/getRecipeDetails';
import RecipeHeader from '../components/RecipeHeader';
import IngredientsCheckList from '../components/IngredientsCheckList';
import useLocalStorage from '../hooks/useLocalStorage';

export default function InProcessFood() {
  const { id } = useParams();
  const history = useHistory();
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

  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);

  function handleToggleFavorite() {
    if (isFavorite) {
      const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
      setFavoriteRecipes(newFavoriteRecipes);
    } else {
      setFavoriteRecipes([...favoriteRecipes, {
        id,
        type: 'comida',
        area: recipeData.strArea,
        category: recipeData.strCategory,
        name: recipeData.strMeal,
        image: recipeData.strMealThumb,
        alcoholicOrNot: '',
      }]);
    }
  }

  useEffect(() => {
    getFoodRecipeDetails(id)
      .then((data) => setRecipeData(data));
  }, [id]);

  return (
    <Container>
      <RecipeHeader
        isFavorite={ isFavorite }
        toggleFavorite={ handleToggleFavorite }
        imgUrl={ recipeData ? recipeData.strMealThumb : '' }
        title={ recipeData ? recipeData.strMeal : '' }
        category={ recipeData ? recipeData.strCategory : '' }
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

      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            disabled={ !allIngredientsChecked }
            onClick={ () => history.push('/receitas-feitas') }
            className="w-100 my-3 py-2"
            style={ {
              fontSize: '20px',
            } }
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
