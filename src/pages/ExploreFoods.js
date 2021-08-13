import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import ExploreOptionButton from '../components/ExploreOptionButton';
import { randomFoodRequest } from '../services/foodSearch';
import listIcon from '../images/listIcon.svg';
import surpriseIcon from '../images/surpriseIcon.svg';
import mapIcon from '../images/mapIcon.svg';

export default function ExploreFoods() {
  const history = useHistory();
  const [randomFood, setRandomFood] = useState('');

  useEffect(() => {
    randomFoodRequest().then((res) => setRandomFood(res));
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" />
      <div
        className="d-flex flex-column align-items-center mx-4"
        style={ {
          padding: '80px 0 70px',
          height: '100vh',
        } }
      >
        <ExploreOptionButton
          color="#FA8334"
          handleClick={ () => history.push('/explorar/comidas/ingredientes') }
          icon={ listIcon }
          text="Por Ingredientes"
          data-testid="explore-by-ingredient"
        />
        <ExploreOptionButton
          color="#11a999"
          handleClick={ () => history.push('/explorar/comidas/area') }
          icon={ mapIcon }
          text="Por Local de Origem"
          data-testid="explore-by-area"
        />
        <ExploreOptionButton
          color="#ED254E"
          handleClick={ () => history.push(`/comidas/${randomFood}`) }
          icon={ surpriseIcon }
          text="Me Surpreenda!"
          data-testid="explore-surprise"
        />
      </div>
      <LowerMenu />
    </div>
  );
}
