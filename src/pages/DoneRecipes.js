import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [recipes, setRecipes] = useState(doneRecipes);
  const filterRecipesDone = (type) => {
    if (type === 'all') {
      setRecipes(doneRecipes);
    } else {
      const filterResult = doneRecipes.filter((item) => item.type === type);
      setRecipes(filterResult);
    }
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
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
            doneRecipes ? recipes.map((item, index) => (
              <DoneRecipeCard
                key={ item.id }
                item={ item }
                index={ index }
              />
            )) : null
          }
        </div>
      </div>
    </div>
  );
}
