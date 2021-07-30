import React from 'react';
import Header from '../components/Header';
import RecipesRender from '../components/RecipesRender';

export default function DrinkRecipes() {
  return (
    <div>
      <Header title="Bebidas" showSearchIcon />
      <RecipesRender />
    </div>
  );
}
