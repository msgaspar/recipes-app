import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

function RecipeCard({ recipeId, imgUrl, index, recipeName, onClick }) {
  return (
    <button
      data-testid={ `${index}-recipe-card` }
      type="button"
      className="my-2 recipe-card p-0"
      style={ {
        position: 'relative',
        borderRadius: '15px',
        border: 'none',
        backgroundColor: 'white',
        overflow: 'hidden',
        height: '160px',
        verticalAlign: 'middle',
        boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 10px 15px, rgba(0, 0, 0, 0.05) 0px 4px 6px',
      } }
      id={ recipeId }
      onClick={ onClick }
    >
      <Image
        fluid
        src={ imgUrl }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
        style={ {
          marginTop: '-40px',
        } }
      />
      <p
        data-testid={ `${index}-card-name` }
        className="position-absolute font-weight-bold"
        style={ {
          bottom: '0',
          left: '20px',
          fontSize: '24px',
          color: 'white',
          textAlign: 'left',
          lineHeight: '1',
        } }
      >
        {recipeName}
      </p>
    </button>
  );
}

RecipeCard.propTypes = {
  recipeId: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecipeCard;
