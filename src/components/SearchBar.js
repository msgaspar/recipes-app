import React, { useState } from 'react';

export default function SearchBar() {
  const [searchType, setSearchType] = useState('');
  const [searchText, setSearchText] = useState('');

  function handleTextSearch(target) {
    const { value } = target;
    setSearchText(value);
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
            value="name"
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
            value="first-letter"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
        </label>
      </form>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}
