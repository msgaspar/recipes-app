import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
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
        <button
          className="w-100 my-2
            d-flex flex-column justify-content-center align-items-center"
          style={ {
            border: 'none',
            borderRadius: '8px',
            flexGrow: 1,
            backgroundColor: '#FA8334',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '24px',
          } }
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          <img
            style={ {
              width: '80px',
              marginBottom: '22px',
            } }
            src={ mealIcon }
            alt="Explorar bebidas"
          />
          Explorar Comidas
        </button>
        <button
          className="w-100 my-2 d-flex flex-column justify-content-center align-items-center"
          style={ {
            borderRadius: '8px',
            border: 'none',
            flexGrow: 1,
            backgroundColor: '#11a999',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '24px',
          } }
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          <img
            style={ {
              width: '80px',
              marginBottom: '22px',
            } }
            src={ drinkIcon }
            alt="Explorar bebidas"
          />
          Explorar Bebidas
        </button>
      </div>
      <LowerMenu />
    </div>
  );
}
