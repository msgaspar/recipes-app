import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../DoneRecipes.css';
import Header from '../components/Header';

export default function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [recipes, setRecipes] = useState(doneRecipes);
  const [copyText, setCopyText] = useState('');
  const filterRecipesDone = (type) => {
    if (type === 'all') {
      setRecipes(doneRecipes);
    } else {
      const filterResult = doneRecipes.filter((item) => item.type === type);
      setRecipes(filterResult);
    }
  };

  const handleClickCopy = (recipe) => {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), '2000');
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      <p>{copyText}</p>
      <section>
        <button
          className="buttons"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipesDone('all') }
        >
          All
        </button>
        <button
          className="buttons"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipesDone('comida') }
        >
          Food
        </button>
        <button
          className="buttons"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipesDone('bebida') }
        >
          Drink
        </button>
      </section>
      {
        doneRecipes ? recipes.map((item, index) => {
          if (item.type === 'comida') {
            return (
              <section className="recipes-done" key={ item.id }>
                <Link to={ `/comidas/${item.id}` }>
                  <img
                    width="200px"
                    data-testid={ `${index}-horizontal-image` }
                    alt="recipe"
                    src={ item.image }
                  />
                </Link>
                <section>
                  <button
                    type="button"
                    onClick={ () => handleClickCopy(item) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      alt="share"
                      src={ shareIcon }
                    />
                  </button>
                  <Link to={ `/comidas/${item.id}` }>
                    <h4 data-testid={ `${index}-horizontal-name` }>{item.name}</h4>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${item.area} - ${item.category}`}
                  </p>
                  <b />
                  <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
                  <b />
                  <p>
                    {item.tags.map((itemTag, indexTag) => (
                      <span
                        data-testid={ `${index}-${itemTag}-horizontal-tag` }
                        key={ indexTag }
                      >
                        {itemTag}
                      </span>
                    ))}
                  </p>
                </section>
              </section>
            );
          }
          return (
            <section className="recipes-done" key={ item.id }>
              <Link to={ `/bebidas/${item.id}` }>
                <img
                  width="200px"
                  data-testid={ `${index}-horizontal-image` }
                  alt="recipe"
                  src={ item.image }
                />
              </Link>
              <section>
                <button
                  type="button"
                  onClick={ () => handleClickCopy(item) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="share"
                    src={ shareIcon }
                  />
                </button>
                <Link to={ `/bebidas/${item.id}` }>
                  <h4 data-testid={ `${index}-horizontal-name` }>{item.name}</h4>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {item.alcoholicOrNot}
                </p>
                <b />
                <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
              </section>
            </section>
          );
        }) : null
      }
    </div>
  );
}
