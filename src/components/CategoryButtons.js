import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';

export default function CategoryButtons() {
  const FOOD_BUTTONS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const DRINK_BUTTONS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const FOOD_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const DRINK_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  const sizeButtons = 5;
  const location = useLocation();
  const {
    setRecipeData,
    recipeData,
    buttonsCategories,
    setButtonsCategories,
  } = useContext(FoodsContext);

  const categoryClickOptions = {
    '/comidas': FOOD_CATEGORIES_URL,
    '/bebidas': DRINK_CATEGORIES_URL,
  };

  async function searchFoodByCategory(category) {
    const endpoint = categoryClickOptions[location.pathname];
    const response = await fetch(`${endpoint}${category}`);
    const data = await response.json();
    if (location.pathname === '/comidas') {
      return setRecipeData({ ...recipeData, meals: [...data.meals] });
    } return setRecipeData({ ...recipeData, drinks: [...data.drinks] });
  }

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
          onClick={ ({ target }) => searchFoodByCategory(target.innerHTML) }
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

