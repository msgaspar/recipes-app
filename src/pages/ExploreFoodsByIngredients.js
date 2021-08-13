import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import { fetchIngredientsFood } from '../services/foodSearch';
import FoodsContext from '../context/FoodsContext';

export default function ExploreFoodsByIngredients() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const { filteredIngredient, setFilteredIngredient } = useContext(FoodsContext);

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
      {console.log(filteredIngredient)}
      <Header title="Explorar Ingredientes" />
      <div>
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <div
            role="presentation"
            data-testid={ `${index}-ingredient-card` }
            key={ ingredient.idIngredient }
            onClick={ () => {
              setFilteredIngredient(ingredient.strIngredient);
              history.push('/comidas');
            } }
            name={ ingredient.strIngredient }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="100px"
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt=""
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>
          </div>
        ))}
      </div>
      <LowerMenu />
    </div>
  );
}
