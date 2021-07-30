import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function FoodRecipes() {
  return (
    <div>
      <Header title="Comidas" showSearchIcon />
      food recipes
      <LowerMenu />
    </div>
  );
}
