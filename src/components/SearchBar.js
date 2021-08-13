import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
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
    '/comidas': (foodRecipe) => setRecipeData([...foodRecipe]),
    '/bebidas': (foodRecipe) => setRecipeData([...foodRecipe]),
  };

  function handleTextSearch(target) {
    const { value } = target;
    setSearchText(value);
  }

  async function handleSearch() {
    if (searchType !== 'firstLetter' && searchText) {
      const data = await fetchOptions[location.pathname][searchType]();
      if (!data) {
        // eslint-disable-next-line no-alert
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      return setRecipeDataOptions[location.pathname](data);
    }
    if (searchType === 'firstLetter' && searchText.length === 1) {
      const data = await fetchOptions[location.pathname][searchType]();
      if (!data) {
        // eslint-disable-next-line no-alert
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      return setRecipeDataOptions[location.pathname](data);
    }
    // eslint-disable-next-line no-alert
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
    <div
      className="px-2"
    >
      <form className="d-flex flex-column">
        <label
          htmlFor="search-by-text"
          className="w-100"
        >
          <input
            className="w-100 px-3 py-2 mb-2"
            style={ {
              border: 'none',
              backgroundColor: '#f6f6f6',
              height: '48px',
              outline: 0,
              borderRadius: '4px',
            } }
            type="text"
            data-testid="search-input"
            placeholder="Digite o nome da opção de busca..."
            value={ searchText }
            onChange={ ({ target }) => handleTextSearch(target) }
          />
        </label>
        <label
          className="ml-3 d-flex align-items-center"
          htmlFor="ingredient-search-radio"
        >
          <input
            className="mr-1 mb-1"
            name="search-type"
            type="radio"
            value="ingredient"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          Buscar por ingrediente
        </label>
        <label
          className="ml-3 d-flex align-items-center"
          htmlFor="name-search-radio"
        >
          <input
            className="mr-1 mb-1"
            name="search-type"
            type="radio"
            value="foodName"
            id="name-search-radio"
            data-testid="name-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          Buscar por nome
        </label>
        <label
          className="ml-3 d-flex align-items-center"
          htmlFor="first-letter-search-radio"
        >
          <input
            className="mr-1 mb-1"
            name="search-type"
            type="radio"
            value="firstLetter"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          Buscar pela primeira letra
        </label>
      </form>
      <Button
        className="w-100 mt-2 mb-4 py-2 font-weight-bold"
        // variant="outline-primary"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </Button>
      {recipeData.length === 1 ? handleRedirect() : null}
    </div>
  );
}
