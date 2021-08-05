import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Button, Col } from 'react-bootstrap';
import getRecipeDetails from '../services/getRecipeDetails';
import RecipeHeader from '../components/RecipeHeader';
import IngredientsCheckList from '../components/IngredientsCheckList';

export default function InProcessFood() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);

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
    getRecipeDetails(id)
      .then((data) => setRecipeData(data));
  }, [id]);

  return (
    <Container>
      <RecipeHeader
        imgUrl={ recipeData ? recipeData.strMealThumb : '' }
        title={ recipeData ? recipeData.strMeal : '' }
        category={ recipeData ? recipeData.strCategory : '' }
      />
      <IngredientsCheckList ingredients={ ingredients } />
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
