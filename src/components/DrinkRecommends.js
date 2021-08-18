import React from 'react';
import PropTypes from 'prop-types';

export default function DrinkRecommends({ recommends }) {
  const recommendsSize = 6;

  function hideRecommends(strDrink, index) {
    if (index <= 1) {
      return (
        <div
          key={ index }
          data-testid={ `${index}-recomendation-card` }
          className="px-4"
          style={ {
            maxWidth: '500px',
            paddingBottom: '10px',
          } }
        >
          <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
        </div>
      );
    } return (
      <div key={ index } data-testid={ `${index}-recomendation-card` }>
        <p
          data-testid={ `${index}-recomendation-title` }
          style={ { display: 'none' } }
        >
          { strDrink }
        </p>
      </div>
    );
  }

  function renderRecommends() {
    return recommends.slice(0, recommendsSize)
      .map(({ strDrink }, index) => hideRecommends(strDrink, index));
  }

  return (
    <div>
      { recommends ? renderRecommends() : null }
    </div>
  );
}

DrinkRecommends.propTypes = {
  recommends: PropTypes.arrayOf(Object),
}.isRequired;
