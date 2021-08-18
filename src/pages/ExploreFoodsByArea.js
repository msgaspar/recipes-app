import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { fetchRecipeAllFood,
  fetchRecipeBySelectedCountry, fetchRecipeCountry } from '../services/foodSearch';

export default function ExploreCountry() {
  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState('All');
  const [recepies, setRecepies] = useState([]);
  const twelve = 12;

  useEffect(() => {
    const getCountries = async () => {
      const newCountries = await fetchRecipeCountry();
      setCountries(newCountries.meals);
    };
    getCountries();
  }, []);

  useEffect(() => {
    let newRecepies;
    const getRecepies = async () => {
      if (countrySelected === 'All') {
        newRecepies = await fetchRecipeAllFood();
      } else {
        newRecepies = await fetchRecipeBySelectedCountry(countrySelected);
      }
      setRecepies(newRecepies.meals.slice(0, twelve));
    };
    getRecepies();
  }, [countrySelected]);
  return (
    <div>
      <Header title="Explorar Origem" showSearchIcon />
      <div
        className="mx-4 d-flex flex-column align-items-center"
        style={ {
          paddingTop: '80px',
        } }
      >

        <select
          className="w-100 py-3 px-3 h5 "
          style={ {
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#f5f5f5',
          } }
          data-testid="explore-by-area-dropdown"
          name="country"
          id="id-country"
          onChange={ ({ target }) => setCountrySelected(target.value) }
        >
          <option key="0" data-testid="All-option">All</option>
          {countries.map((country, index) => (
            <option
              key={ index + 1 }
              data-testid={ `${country.strArea}-option` }
            >
              {country.strArea}
            </option>
          ))}
        </select>

        <div
          className="mx-auto mt-2"
          style={ {
            maxWidth: '500px',
            paddingBottom: '70px',
          } }
        >
          { recepies.map((element, index) => (
            <RecipeCard
              key={ index }
              recipeId={ element.idMeal }
              imgUrl={ element.strMealThumb }
              index={ index }
              recipeName={ element.strMeal }
              onClick={ () => history.push(`/comidas/${element.idMeal}`) }
            />
          ))}
        </div>
      </div>
      <LowerMenu />
    </div>
  );
}
