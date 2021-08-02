import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function DrinkRecipes() {
  return (
    <div>
      <Header title="Bebidas" showSearchIcon />
      Drink recipes
      <LowerMenu />
    </div>
  );
}
