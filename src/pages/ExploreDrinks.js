import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExploreDrinks() {
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
      <Link>
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
