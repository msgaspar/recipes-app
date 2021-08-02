import React from 'react';
import { Link } from 'react-router-dom';
import '../LowerMenu.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function LowerMenu() {
  return (
    <div data-testid="footer" className="menu-footer">
      <footer className="footer-wrap">
        <Link
          to="/bebidas"
        >
          <img data-testid="drinks-bottom-btn" alt="imagem drink" src={ drinkIcon } />
          Bebidas
        </Link>

        <Link
          to="/explorar"
        >
          <img data-testid="explore-bottom-btn" alt="imagem drink" src={ exploreIcon } />
          Explorar
        </Link>

        <Link
          to="/comidas"
        >
          <img data-testid="food-bottom-btn" alt="imagem drink" src={ mealIcon } />
          Comidas
        </Link>
      </footer>

    </div>
  );
}

export default LowerMenu;
