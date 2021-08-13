import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import ExploreOptionButton from '../components/ExploreOptionButton';
import { randomDrinkRequest } from '../services/drinkSearch';
import surpriseIcon from '../images/surpriseIcon.svg';
import listIcon from '../images/listIcon.svg';

export default function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState('');
  const history = useHistory();

  useEffect(() => {
    randomDrinkRequest().then((res) => setRandomDrink(res));
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div
        className="d-flex flex-column align-items-center mx-4"
        style={ {
          padding: '80px 0 70px',
          height: '100vh',
        } }
      >
        <ExploreOptionButton
          color="#FA8334"
          handleClick={ () => history.push('/explorar/bebidas/ingredientes') }
          icon={ listIcon }
          text="Por Ingredientes"
          data-testid="explore-by-ingredient"
        />
        <ExploreOptionButton
          color="#ED254E"
          handleClick={ () => history.push(`/bebidas/${randomDrink}`) }
          icon={ surpriseIcon }
          text="Me Surpreenda!"
          data-testid="explore-surprise"
        />
      </div>
      <LowerMenu />
    </div>
  );
}
