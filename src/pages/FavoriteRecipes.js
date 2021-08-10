import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
// import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import '../DoneRecipes.css';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  // const { id } = useParams();
  const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [recipes, setRecipes] = useState(savedRecipes);
  const [copyText, setCopyText] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  // const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);

  const filterRecipesDone = (type) => {
    if (type === 'all') {
      setRecipes(savedRecipes);
    } else {
      const filterResult = savedRecipes.filter((item) => item.type === type);
      setRecipes(filterResult);
    }
  };

  const handleClickCopy = (recipe) => {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), '2000');
  };

  function handleToggleFavorite(target) {
    const newFavoriteRecipes = favoriteRecipes
      .filter((recipe) => recipe.id !== target.id);
    setFavoriteRecipes(newFavoriteRecipes);
    setRecipes(newFavoriteRecipes);
  }

  return (
    <div>
      <p>{copyText}</p>
      <Header title="Receitas Favoritas" />
      favorite recipes
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
        savedRecipes ? recipes.map((item, index) => {
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
                  <Button
                    variant="link"
                    onClick={ ({ target }) => handleToggleFavorite(target) }
                  >
                    <Image
                      src={ BlackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      id={ item.id }
                    />
                  </Button>
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
                    {/* {item.tags.map((itemTag, indexTag) => (
                      <span
                        data-testid={ `${index}-${itemTag}-horizontal-tag` }
                        key={ indexTag }
                      >
                        {itemTag}
                      </span>
                    ))} */}
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
                <Button
                  variant="link"
                  onClick={ ({ target }) => handleToggleFavorite(target) }
                >
                  <Image
                    src={ BlackHeartIcon }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    id={ item.id }
                  />
                </Button>
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
