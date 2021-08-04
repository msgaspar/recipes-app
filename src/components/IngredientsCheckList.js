import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function IngredientsCheckList({ ingredients }) {
  return (
    <div>
      <h3>Ingredients</h3>
      <Form className="mt-2 mb-4">
        {
          ingredients.map((name, index) => (
            <div
              key={ index }
              className="ml-3"
            >
              <Form.Check
                className="d-flex align-items-center"
                label={ name }
                data-testid={ `${index}-ingredient-step` }
                id={ `${index}-ingredient-step` }
              />
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
