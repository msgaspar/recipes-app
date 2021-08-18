import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import FoodsContext from '../context/FoodsContext';
import Header from '../components/Header';
import { fetchIngredientsDrink } from '../services/drinkSearch';
import IngredientCard from '../components/IngredientCard';

export default function ExploreDrinksByIngredients() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const { setFilteredIngredient } = useContext(FoodsContext);

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
      <div
        className="d-flex flex-wrap align-items-center mx-4"
        style={ {
          padding: '100px 0 70px',
        } }
      >
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ ingredient.idIngredient }
            index={ index }
            name={ ingredient.strIngredient1 }
            handleClick={ () => {
              setFilteredIngredient(ingredient.strIngredient1);
              history.push('/bebidas');
            } }
            imgUrl={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
          />
        ))}
      </div>
      <LowerMenu />
    </div>
  );
}
