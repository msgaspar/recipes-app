export async function searchDrinkByIngredient(ingredient) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function searchDrinkByName(drinkName) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function searchDrinkByFirstLetter(word) {
  const firstLetter = word[0];
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export const randomDrinkRequest = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data.drinks[0].idDrink;
};

export const fetchIngredientsDrink = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((res) => res.json())
    .then((response) => response)
);
