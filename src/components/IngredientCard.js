import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ name, index, handleClick, ...otherProps }) {
  return (
    <div
      className="m-2 flex-grow-1 d-flex flex-column align-items-center"
      style={ {
        flexBasis: '120px',
        height: '170px',
      } }
      role="presentation"
      data-testid={ `${index}-ingredient-card` }
      onClick={ handleClick }
      name={ name }
      { ...otherProps }
    >
      <img
        data-testid={ `${index}-card-img` }
        width="100px"
        src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` }
        alt=""
      />
      <p
        className="text-center mt-3 font-weight-bold"
        data-testid={ `${index}-card-name` }
        style={ {
          maxWidth: '130px',
          lineHeight: 1.2,
          fontSize: '18px',
        } }
      >
        {name}

      </p>
    </div>
  );
}

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default IngredientCard;
