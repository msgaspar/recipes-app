import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import useLocalStorage from '../hooks/useLocalStorage';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [recipes, setRecipes] = useState(favoriteRecipes);

  const filterRecipesDone = (type) => {
    if (type === 'all') {
      setRecipes(favoriteRecipes);
    } else {
      const filterResult = favoriteRecipes.filter((item) => item.type === type);
      setRecipes(filterResult);
    }
  };

  function handleToggleFavorite(id) {
    const newFavoriteRecipes = favoriteRecipes
      .filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(newFavoriteRecipes);
    setRecipes(newFavoriteRecipes);
  }

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div
        className="d-flex flex-column"
        style={ {
          paddingTop: '80px',
        } }
      >
        <section>
          <div className="d-flex flex-wrap justify-content-center px-5 mb-3">
            <Button
              className="m-1 flex-fill"
              variant="secondary"
              onClick={ () => filterRecipesDone('all') }
              data-testid="filter-by-all-btn"
            >
              All
            </Button>
            <Button
              className="m-1 flex-fill"
              variant="secondary"
              data-testid="filter-by-food-btn"
              onClick={ () => filterRecipesDone('comida') }
            >
              Food
            </Button>
            <Button
              className="m-1 flex-fill"
              variant="secondary"
              data-testid="filter-by-drink-btn"
              onClick={ () => filterRecipesDone('bebida') }
            >
              Drink
            </Button>
          </div>
        </section>
        <div
          className="px-4"
          style={ {
            maxWidth: '500px',
          } }
        >
          {
            recipes.map((item, index) => (
              <FavoriteRecipeCard
                item={ item }
                index={ index }
                key={ item.id }
                onToggleFavorite={ handleToggleFavorite }
              />))
          }
        </div>
      </div>
    </div>
  );
}
