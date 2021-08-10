import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import { randomDrinkRequest } from '../services/drinkSearch';

export default function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState('');

  useEffect(() => {
    randomDrinkRequest().then((res) => setRandomDrink(res));
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <Link
        to="/explorar/bebidas/ingredientes"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link
        to={ `/bebidas/${randomDrink}` }
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
