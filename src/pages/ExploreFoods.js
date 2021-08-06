import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { randomFoodRequest } from '../services/foodSearch';

export default function ExploreFoods() {
  const [randomFood, setRandomFood] = useState('');

  useEffect(() => {
    randomFoodRequest().then((res) => setRandomFood(res));
  }, []);

  return (
    <div>
      {console.log(randomFood)}
      <Header title="Explorar Comidas" />
      <Link
        to="/explorar/comidas/ingredientes"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link
        to="/explorar/comidas/area"
      >
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link
        to={ `/comidas/${randomFood}` }
      >
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <LowerMenu />
    </div>
  );
}
