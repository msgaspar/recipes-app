import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodsContext from './FoodsContext';

export default function FoodsProvider({ children }) {
  const [recipeData, setRecipeData] = useState([]);
  const context = {
    recipeData,
    setRecipeData,
  };

  return (
    <FoodsContext.Provider value={ context }>
      {children}
    </FoodsContext.Provider>
  );
}

FoodsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
