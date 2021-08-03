import React, { useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import FoodsContext from '../context/FoodsContext';

import {
  searchFoodByIngredient,
  searchFoodByName,
  searchFoodByFirstLetter,
} from '../services/foodSearch';

import {
  searchDrinkByIngredient,
  searchDrinkByName,
  searchDrinkByFirstLetter,
} from '../services/drinkSearch';

export default function SearchBar() {
  const [searchType, setSearchType] = useState('');
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const { recipeData, setRecipeData } = useContext(FoodsContext);

  const fetchOptions = {
    '/comidas': {
      ingredient: () => searchFoodByIngredient(searchText),
      foodName: () => searchFoodByName(searchText),
      firstLetter: () => searchFoodByFirstLetter(searchText),
    },
    '/bebidas': {
      ingredient: () => searchDrinkByIngredient(searchText),
      foodName: () => searchDrinkByName(searchText),
      firstLetter: () => searchDrinkByFirstLetter(searchText),
    },
  };

  const setRecipeDataOptions = {
    '/comidas': (foodRecipe) => setRecipeData({ meals: foodRecipe.meals }),
    '/bebidas': (foodRecipe) => setRecipeData({ drinks: foodRecipe.drinks }),
  };

  function handleTextSearch(target) {
    const { value } = target;
    setSearchText(value);
  }

  async function handleSearch() {
    if (searchType !== 'firstLetter' && searchText) {
      const data = await fetchOptions[location.pathname][searchType]();
      if (!data.meals && !data.drinks) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      return setRecipeDataOptions[location.pathname](data);
    }
    if (searchType === 'firstLetter' && searchText.length === 1) {
      const data = await fetchOptions[location.pathname][searchType]();
      if (!data.meals && !data.drinks) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      return setRecipeDataOptions[location.pathname](data);
    }
    return (alert('Sua busca deve conter somente 1 (um) caracter'));
  }

  function handleRedirect() {
    const foodRedirect = <Redirect to={ `/comidas/${recipeData[0].idMeal}` } />;
    const drinkRedirect = <Redirect to={ `/bebidas/${recipeData[0].idDrink}` } />;
    const redirectOptions = {
      '/comidas': () => foodRedirect,
      '/bebidas': () => drinkRedirect,
    };
    return redirectOptions[location.pathname]();
  }

  return (
    <div>
      <p>{ searchType }</p>
      <form>
        <label htmlFor="search-by-text">
          <input
            type="text"
            data-testid="search-input"
            placeholder="Digite o nome da opção de busca..."
            value={ searchText }
            onChange={ ({ target }) => handleTextSearch(target) }
          />
        </label>
        <label htmlFor="ingredient-search-radio">
          Buscar por ingrediente
          <input
            name="search-type"
            type="radio"
            value="ingredient"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
        </label>
        <label htmlFor="radio-by-name">
          Buscar por nome
          <input
            name="search-type"
            type="radio"
            value="foodName"
            id="ingredient-search-radio"
            data-testid="name-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
        </label>
        <label htmlFor="radio-by-name">
          Buscar pela primeira letra
          <input
            name="search-type"
            type="radio"
            value="firstLetter"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
        </label>
      </form>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch() }
      >
        Buscar
      </button>
      {recipeData.length === 1 ? handleRedirect() : null}
    </div>
  );
}
