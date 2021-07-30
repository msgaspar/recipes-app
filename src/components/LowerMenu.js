import React from 'react';
import { Link } from 'react-router-dom';

function LowerMenu() {
  return (
    <div data-testid="footer">
      <footer>
        <Link
          to="/bebidas"
          data-testid="drinks-bottom-btn"
        >
          Bebidas
        </Link>

        <Link
          to="/explorar"
          data-testid="explore-bottom-btn"
        >
          Explorar
        </Link>

        <Link
          to="/comidas"
          data-testid="food-bottom-btn"
        >
          Comidas
        </Link>
      </footer>

    </div>
  );
}

export default LowerMenu;
