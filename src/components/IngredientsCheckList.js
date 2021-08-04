import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function IngredientsCheckList({ ingredients }) {
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
};

export default IngredientsCheckList;
