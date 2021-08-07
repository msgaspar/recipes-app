import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import useLocalStorage from '../hooks/useLocalStorage';

function IngredientsCheckList({ ingredients, setAllIngredientsChecked }) {
  const { id } = useParams();
  const [storedData, setStoredData] = useLocalStorage('inProgressRecipes', {
    cocktails: {},
    meals: {},
  });

  let checkedIngredients = [];
  if (storedData.meals[id]) {
    checkedIngredients = storedData.meals[id];
  }

  function isIngredientChecked(name) {
    return checkedIngredients.includes(name);
  }

  function handleCheckboxChange({ target }) {
    if (target.checked) {
      checkedIngredients.push(target.name);
    } else {
      checkedIngredients = checkedIngredients.filter((name) => name !== target.name);
    }
    const newStoredData = { ...storedData };
    newStoredData.meals[id] = [...checkedIngredients];
    setStoredData(newStoredData);

    console.log(ingredients);
    console.log(checkedIngredients);

    if (ingredients.length === checkedIngredients.length) {
      setAllIngredientsChecked(true);
    } else {
      setAllIngredientsChecked(false);
    }
  }

  return (
    <div>
      <h3>Ingredients</h3>
      <Form className="mt-2 mb-4 ingredients-checklist">
        {
          ingredients.map((name, index) => (
            <div
              key={ index }
              className="d-flex align-items-center"
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ `${index}-ingredient-step-input` }
                className="mb-2 ml-4"
                name={ name }
                checked={ isIngredientChecked(name) }
                onChange={ handleCheckboxChange }
              />
              <label
                className="ml-3 d-flex align-items-center"
                htmlFor={ `${index}-ingredient-step-input` }
                id={ `${index}-ingredient-step` }
              >
                { name }
              </label>
            </div>
          ))
        }
      </Form>
    </div>
  );
}

IngredientsCheckList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  setAllIngredientsChecked: PropTypes.func.isRequired,
};

export default IngredientsCheckList;
