export async function searchFoodByIngredient(ingredient) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function searchFoodByName(foodName) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function searchFoodByFirstLetter(firstLetter) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export const randomFoodRequest = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data.meals[0].idMeal;
};

export const fetchIngredientsFood = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((res) => res.json())
    .then((response) => response)
);

export const fetchRecipeAllFood = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((res) => res.json())
    .then((json) => json)
);

export const fetchRecipeCountry = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((res) => res.json())
    .then((json) => json)
);

export const fetchRecipeBySelectedCountry = (country) => (
  fetch(`${'https://www.themealdb.com/api/json/v1/1/filter.php?a='}${country}`)
    .then((res) => res.json())
    .then((json) => json)
);
