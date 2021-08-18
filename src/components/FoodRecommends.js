import React from 'react';
import PropTypes from 'prop-types';

export default function FoodRecommends({ recommends }) {
  const recommendsSize = 6;

  function hideRecommends(strMeal, index) {
    if (index <= 1) {
      return (
        <div
          key={ index }
          data-testid={ `${index}-recomendation-card` }
          style={ {
            maxWidth: '500px',
            paddingBottom: '10px',
          } }
        >
          <p data-testid={ `${index}-recomendation-title` }>{ strMeal }</p>
        </div>
      );
    } return (
      <div key={ index } data-testid={ `${index}-recomendation-card` }>
        <p
          data-testid={ `${index}-recomendation-title` }
          style={ { display: 'none' } }
        >
          { strMeal }
        </p>
      </div>
    );
  }

  function renderRecommends() {
    return recommends.slice(0, recommendsSize)
      .map(({ strMeal }, index) => hideRecommends(strMeal, index));
  }

  return (
    <div>
      { recommends ? renderRecommends() : null }
    </div>
  );
}

FoodRecommends.propTypes = {
  recommends: PropTypes.arrayOf(Object),
}.isRequired;
