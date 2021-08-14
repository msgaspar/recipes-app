import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import { fetchIngredientsFood } from '../services/foodSearch';
import FoodsContext from '../context/FoodsContext';
import IngredientCard from '../components/IngredientCard';

export default function ExploreFoodsByIngredients() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const { setFilteredIngredient } = useContext(FoodsContext);

  useEffect(() => {
    const func = async () => {
      const fun = await fetchIngredientsFood();
      const ingredientName = Object.values(fun.meals);
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
          padding: '80px 0 70px',
        } }
      >
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ ingredient.idIngredient }
            index={ index }
            name={ ingredient.strIngredient }
            handleClick={ () => {
              setFilteredIngredient(ingredient.strIngredient);
              history.push('/comidas');
            } }
          />
        ))}
      </div>
      <LowerMenu />
    </div>
  );
}
