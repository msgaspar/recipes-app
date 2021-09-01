import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function FinishFoodRecipe({ checkIngredients, recipeData }) {
  const history = useHistory();
  // const today = new Date();
  // const currentDay = String(today.getDate()).padStart(2, '0');
  // const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  // const currentYear = today.getFullYear();
  // const currentDate = `${currentDay}/${currentMonth}/${currentYear}`;

  function removeFoodFromInProgress(id) {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      delete inProgressRecipes.meals[id];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  function endRecipe() {
    const {
      idMeal: id,
      strArea: area,
      strCategory: category,
      strMeal: name,
      strMealThumb: image,
      strTags: tags,
    } = recipeData;

    removeFoodFromInProgress(id);

    if (localStorage.getItem('doneRecipes')) {
      const currentLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      const newLocalStorage = [...currentLocalStorage, {
        id,
        type: 'comida',
        area,
        category,
        alcoholicOrNot: '',
        name,
        image,
        doneDate: '22/6/2020',
        tags: tags ? [...tags] : [],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(newLocalStorage));
      history.push('/receitas-feitas');
      return;
    } localStorage.setItem('doneRecipes', JSON.stringify([{
      id,
      type: 'comida',
      area,
      category,
      alcoholicOrNot: '',
      name,
      image,
      doneDate: '22/6/2020',
      tags: tags ? [...tags] : [],
    }]));
    history.push('/receitas-feitas');
  }

  return (
    <Row>
      <Col className="d-flex justify-content-center">
        <Button
          disabled={ !checkIngredients }
          onClick={ () => endRecipe() }
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
  );
}

FinishFoodRecipe.propTypes = {
  checkIngredients: PropTypes.bool,
}.isRequired;
