import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getDrinkRecipeDetails } from '../services/getRecipeDetails';
import RecipeHeader from '../components/RecipeHeader';
import IngredientsCheckList from '../components/IngredientsCheckList';

export default function InProcessDrink() {
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
