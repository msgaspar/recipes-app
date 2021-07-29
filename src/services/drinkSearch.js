export async function searchDrinkByIngredient(ingredient) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

export async function searchDrinkByName(drinkName) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

export async function searchDrinkByFirstLetter(word) {
  const firstLetter = word[0];
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${firstLetter}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}
