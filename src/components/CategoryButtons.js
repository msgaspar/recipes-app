import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';

export default function CategoryButtons() {
  const FOOD_BUTTONS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const DRINK_BUTTONS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const sizeButtons = 5;
  const location = useLocation();
  const {
    recipeData,
    buttonsCategories,
    setButtonsCategories,
  } = useContext(FoodsContext);

  useEffect(() => {
    const buttonsRequest = async () => {
      if (location.pathname === '/comidas') {
        const response = await fetch(FOOD_BUTTONS_URL);
        const data = await response.json();
        return data;
      } const response = await fetch(DRINK_BUTTONS_URL);
      const data = await response.json();
      return data;
    };
    if (location.pathname === '/comidas') {
      buttonsRequest().then((data) => setButtonsCategories([...data.meals]));
    }
    if (location.pathname === '/bebidas') {
      buttonsRequest().then((data) => setButtonsCategories([...data.drinks]));
    }
  }, [location, setButtonsCategories]);

  function generateCategoriesButtons() {
    const recipeCategories = buttonsCategories.map(({ strCategory }) => strCategory);
    return (
      recipeCategories.slice(0, sizeButtons).map((category) => (
        <button
          type="button"
          key={ category }
          data-testid={ `${category}-category-filter` }
        >
          { category }
        </button>
      ))
    );
  }

  return (
    <div>
      { recipeData && buttonsCategories ? generateCategoriesButtons() : null }
    </div>
  );
}
