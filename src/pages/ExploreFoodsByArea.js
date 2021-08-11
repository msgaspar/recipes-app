import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
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
      <select
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

      <div>
        { recepies.map((element, index) => (
          <div
            role="presentation"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/comidas/${element.idMeal}`) }
          >
            <img
              src={ element.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ element.strMeal }
              width="100px"
            />
            <p data-testid={ `${index}-card-name` }>
              { element.strMeal}
            </p>
          </div>
        ))}
      </div>
      <LowerMenu />
    </div>
  );
}
