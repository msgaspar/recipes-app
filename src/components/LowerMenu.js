import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function LowerMenu() {
  return (
    <footer
      data-testid="footer"
      className="footer-wrap position-fixed
       w-100 menu-footer d-flex align-items-center justify-content-around"
      style={ {
        backgroundColor: '#007bff',
        height: '60px',
        bottom: '0',
        zIndex: 1,
      } }
    >
      <Link
        to="/bebidas"
      >
        <img
          style={ {
            width: '30px',
          } }
          data-testid="drinks-bottom-btn"
          alt="imagem drink"
          src={ drinkIcon }
        />
      </Link>

      <Link
        to="/explorar"
      >
        <img
          style={ {
            width: '30px',
          } }
          data-testid="explore-bottom-btn"
          alt="imagem drink"
          src={ exploreIcon }
        />
      </Link>

      <Link
        to="/comidas"
      >
        <img
          style={ {
            width: '30px',
          } }
          data-testid="food-bottom-btn"
          alt="imagem drink"
          src={ mealIcon }
        />
      </Link>
    </footer>
  );
}

export default LowerMenu;
