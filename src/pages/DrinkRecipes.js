import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import RecipesRender from '../components/RecipesRender';

export default function DrinkRecipes() {
  return (
    <div>
      <Header title="Bebidas" showSearchIcon />
      Drink recipes
      <LowerMenu />
      <RecipesRender />
    </div>
  );
}
