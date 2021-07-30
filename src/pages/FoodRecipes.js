import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import RecipesRender from '../components/RecipesRender';

export default function FoodRecipes() {
  return (
    <div>
      <Header title="Comidas" showSearchIcon />
      <RecipesRender />
      <LowerMenu />
    </div>
  );
}
