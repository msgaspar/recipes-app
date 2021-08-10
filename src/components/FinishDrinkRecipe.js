import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function FinishDrinkRecipe({ checkIngredients, recipeData }) {
  const history = useHistory();
  // const today = new Date();
  // const currentDay = String(today.getDate()).padStart(2, '0');
  // const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  // const currentYear = today.getFullYear();
  // const currentDate = `${currentDay}/${currentMonth}/${currentYear}`;

  function endRecipe() {
    const {
      idDrink: id,
      strCategory: category,
      strAlcoholic: alcoholicOrNot,
      strDrink: name,
      strDrinkThumb: image,
      strTags: tags,
    } = recipeData;

    if (localStorage.getItem('doneRecipes')) {
      const currentLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      const newLocalStorage = [...currentLocalStorage, {
        id,
        type: 'bebida',
        area: '',
        category,
        alcoholicOrNot,
        name,
        image,
        doneDate: '23/6/2020',
        tags: tags ? [...tags] : [],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(newLocalStorage));
      history.push('/receitas-feitas');
      return;
    } localStorage.setItem('doneRecipes', JSON.stringify([{
      id,
      type: 'bebida',
      area: '',
      category,
      alcoholicOrNot,
      name,
      image,
      doneDate: '23/6/2020',
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

FinishDrinkRecipe.propTypes = {
  checkIngredients: PropTypes.bool,
}.isRequired;
