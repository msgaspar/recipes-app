import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import ExploreOptionButton from '../components/ExploreOptionButton';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explorar" />
      <div
        className="d-flex flex-column align-items-center mx-4"
        style={ {
          padding: '80px 0 70px',
          height: '100vh',
        } }
      >
        <ExploreOptionButton
          color="#FA8334"
          handleClick={ () => history.push('/explorar/comidas') }
          icon={ mealIcon }
          text="Explorar Comidas"
          data-testid="explore-food"
        />
        <ExploreOptionButton
          color="#11a999"
          handleClick={ () => history.push('/explorar/bebidas') }
          icon={ drinkIcon }
          text="Explorar Bebidas"
          data-testid="explore-drinks"
        />
      </div>
      <LowerMenu />
    </div>
  );
}
