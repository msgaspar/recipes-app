import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function FoodRecipes() {
  return (
    <div>
      <Header title="Comidas" showSearchIcon />
      <SearchBar />
      food recipes
    </div>
  );
}
