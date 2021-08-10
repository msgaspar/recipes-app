import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import { fetchIngredientsDrink } from '../services/drinkSearch';

export default function ExploreDrinksByIngredients() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const func = async () => {
      const fun = await fetchIngredientsDrink();
      const ingredientName = Object.values(fun.drinks);
      const twelve = 12;
      setIngredients(ingredientName.slice(0, twelve));
    };
    func();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="div-cards-ingredients">
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <div
            role="presentation"
            data-testid={ `${index}-ingredient-card` }
            key={ ingredient.idIngredient }
            onClick={ () => history
              .push({ pathname: '/bebidas' }) }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="100px"
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt=""
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
          </div>
        ))}
      </div>
      <LowerMenu />
    </div>
  );
}
